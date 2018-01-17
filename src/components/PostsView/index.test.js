import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

import { PostsView, styles } from './'
import GroupedPosts from '../GroupedPosts'
import Post from '../Post'

describe('PostsView container', () => {
  let wrapper, placeholderProps
  beforeAll(() => {
    placeholderProps = {
      groupByUserId: false,
      handleChangeSortBy: jest.fn(),
      handleChangeSortOrder: jest.fn(),
      posts: [{ id: 1 }],
      requestFetchPosts: jest.fn(),
      toggleGroupByUserId: jest.fn()
    }
    wrapper = shallow(<PostsView {...placeholderProps} />)
  })
  it('renders GroupedPosts if groupByUserId is true', () => {
    wrapper.setProps({ groupByUserId: true })
    const groupedPosts = wrapper.find(GroupedPosts)
    expect(groupedPosts.length).toBe(1)
  })
  it('renders Post(s) if groupByUserId is false', () => {
    wrapper.setProps({ groupByUserId: false })
    const post = wrapper.find(Post)
    expect(post.length).toBe(placeholderProps.posts.length)
  })
  it('renders Loading button text when loading', () => {
    wrapper.setProps({ fetching: true })
    let fetchButton = wrapper.find('button')
    expect(fetchButton.text()).toBe('Loading...')

    wrapper.setProps({ fetching: false })
    fetchButton = wrapper.find('button')
    expect(fetchButton.text()).toBe('Fetch Posts')
  })
  it('calls requestFetchPosts when button is pressed', () => {
    const button = wrapper.find('button')
    button.props().onClick()
    expect(placeholderProps.requestFetchPosts).toHaveBeenCalled()
  })
  it('calls handleChangeSortBy onChange', () => {
    const firstSelect = wrapper.find('select').first()
    firstSelect.props().onChange('event')
    expect(placeholderProps.handleChangeSortBy).toHaveBeenCalledWith('event')
  })
  it('calls handleChangeSortOrder onChange', () => {
    const secondSelect = wrapper.find('select').at(1)
    secondSelect.props().onChange('event')
    expect(placeholderProps.handleChangeSortOrder).toHaveBeenCalled()
  })
  it('calls toggleGroupByUserId onChange', () => {
    const toggleInput = wrapper.findWhere(node => {
      return node.type() === 'input' && node.props().id === 'groupByUserId'
    })
    toggleInput.props().onChange()
    expect(placeholderProps.toggleGroupByUserId).toHaveBeenCalled()
  })
  it('renders error if there is an error', () => {
    wrapper.setProps({ error: 'Test Error' })
    let errorDiv = wrapper.findWhere(node => {
      return node.type() === 'div' && node.props().style === styles.error
    })
    expect(errorDiv.length).toBe(1)

    wrapper.setProps({ error: '' })
    errorDiv = wrapper.findWhere(node => {
      return node.type() === 'div' && node.props().style === styles.error
    })
    expect(errorDiv.length).toBe(0)
  })
})
