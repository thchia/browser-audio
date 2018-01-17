import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import { TrackListView } from './'

describe('TrackListView component', () => {
  let wrapper, placeholderProps
  beforeAll(() => {
    placeholderProps = {
      isTrackAdded: jest.fn(() => jest.fn()),
      toggleAddTrack: jest.fn(),
      tracks: [{ id: 1, name: 'track-1' }]
    }
    wrapper = shallow(<TrackListView {...placeholderProps} />)
  })
  it('renders correct number of inputs', () => {
    const input = wrapper.find('input')
    expect(input.length).toBe(placeholderProps.tracks.length)
  })
  it('calls toggleAddTrack onChange', () => {
    const input = wrapper.find('input').first()
    input.props().onChange()
    expect(placeholderProps.toggleAddTrack).toHaveBeenCalledWith(
      placeholderProps.tracks[0].id
    )
  })
})
