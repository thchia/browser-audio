import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import { Track } from './'

describe('Track component', () => {
  let wrapper, placeholderProps
  beforeAll(() => {
    placeholderProps = {
      registerTrack: jest.fn()
    }
    wrapper = shallow(<Track {...placeholderProps} />)
  })
  it('calls registerTrack', () => {
    expect(placeholderProps.registerTrack).toHaveBeenCalled()
  })
  it('renders audio element', () => {
    const audio = wrapper.find('audio')
    expect(audio.length).toBe(1)
  })
})
