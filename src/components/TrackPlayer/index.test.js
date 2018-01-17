import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import { TrackPlayer, maxDuration } from './'
import Track from '../NewTrack'

describe('TrackPlayer component', () => {
  let wrapper, placeholderProps
  beforeAll(() => {
    placeholderProps = {
      addedTracks: [
        { node: { play: jest.fn(), pause: jest.fn(), currentTime: 8 } }
      ],
      tracks: [{ id: 1, added: true }],
      trackMuted: jest.fn(),
      handleUpdateMasterTime: jest.fn(),
      handleMasterPlay: jest.fn(),
      handleMasterStop: jest.fn(),
      handleMasterMute: jest.fn(),
      handleSeekTime: jest.fn(),
      muteSingleTrack: jest.fn()
    }
    wrapper = shallow(<TrackPlayer {...placeholderProps} />)
  })
  it('performs expected actions on play', () => {
    const playButton = wrapper.findWhere(node => {
      return node.type() === 'button' && node.text() === 'Play'
    })
    playButton.props().onClick()
    placeholderProps.addedTracks.forEach(track => {
      expect(track.node.play).toHaveBeenCalled()
    })
    expect(placeholderProps.handleMasterPlay).toHaveBeenCalled()
    expect(wrapper.state().interval).toBeGreaterThan(-1)
    wrapper.instance().stop()
  })

  it('performs expected actions on stop', () => {
    wrapper.instance().play()
    wrapper.setProps({ playing: false })
    const stopButton = wrapper.findWhere(node => {
      return node.type() === 'button' && node.text() === 'Stop'
    })
    stopButton.props().onClick()
    placeholderProps.addedTracks.forEach(track => {
      expect(track.node.pause).toHaveBeenCalled()
      expect(track.node.currentTime).toBe(0)
    })
    expect(placeholderProps.handleMasterStop).toHaveBeenCalled()
    expect(wrapper.state().interval).toBe(-1)
  })

  it('performs expected actions on muteAll', () => {
    const muteButton = wrapper
      .findWhere(node => {
        return node.type() === 'button' && node.text() === 'Mute'
      })
      .first()
    muteButton.props().onClick()
    expect(placeholderProps.handleMasterMute).toHaveBeenCalled()
  })

  it('calls handleSeekTime on seek', () => {
    const scrubber = wrapper.find('input')
    scrubber.props().onChange('event')
    expect(placeholderProps.handleSeekTime).toHaveBeenCalledWith('event')
  })

  it('calls stop if currentTime exceeds maxDuration', () => {
    placeholderProps.handleMasterStop.mockClear()
    wrapper.setProps({ currentTime: maxDuration + 1, playing: true })
    expect(placeholderProps.handleMasterStop).toHaveBeenCalledTimes(1)
  })

  it('calls muteSingleTrack', () => {
    const trackMuteButton = wrapper
      .findWhere(node => {
        return node.type() === 'button' && node.text() === 'Mute'
      })
      .at(1)
    trackMuteButton.props().onClick()
    expect(placeholderProps.muteSingleTrack).toHaveBeenCalledWith(
      placeholderProps.tracks[0].id
    )
  })

  it('renders Tracks', () => {
    const tracks = wrapper.find(Track)
    expect(tracks.length).toBe(placeholderProps.tracks.length)
  })
})
