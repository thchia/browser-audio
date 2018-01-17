import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import GroupedPosts, { styles } from './'
import Post from '../Post'

describe('GroupedPosts component', () => {
  let wrapper, placeholderProps
  beforeAll(() => {
    placeholderProps = {
      posts: {
        '1': { posts: [{ id: 1 }] },
        '2': { posts: [{ id: 2 }] }
      }
    }
    wrapper = shallow(<GroupedPosts {...placeholderProps} />)
  })
  it('renders correct number of groups', () => {
    const userGroup = wrapper.findWhere(
      node => node.props().style === styles.user
    )
    const expectedNumber = Object.keys(placeholderProps.posts).length
    expect(userGroup.length).toBe(expectedNumber)
  })
  it('renders posts correctly', () => {
    wrapper.setState({ hidden: [] })
    const showHideButton = wrapper.find('button')
    showHideButton.forEach(button => {
      expect(button.text()).toBe('Hide Posts')
    })
    let posts = wrapper.find(Post)
    expect(posts.length).toBe(2)

    wrapper.setState({ hidden: ['1'] })
    const showButton = wrapper.findWhere(node => {
      return node.type() === 'button' && node.text() === 'Show Posts'
    })
    expect(showButton.length).toBe(1)
    posts = wrapper.find(Post)
    expect(posts.length).toBe(1)
  })
})
