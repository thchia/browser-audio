import React from 'react'

import PostsView from '../PostsView'

const baseURL = 'https://jsonplaceholder.typicode.com'

export default class PostsController extends React.Component {
  constructor() {
    super()
    this.state = {
      fetching: false,
      posts: [],
      error: ''
    }
    this.handleFetchPosts = this.handleFetchPosts.bind(this)
  }
  async handleFetchPosts() {
    this.setState({ fetching: true, error: '' })
    try {
      const response = await fetch(`${baseURL}/posts`)
      const posts = await response.json()
      this.setState({
        fetching: false,
        posts
      })
    } catch (err) {
      this.setState({
        fetching: false,
        error: 'Error fetching posts'
      })
    }
  }
  render() {
    const { state } = this
    return <PostsView {...state} requestFetchPosts={this.handleFetchPosts} />
  }
}
