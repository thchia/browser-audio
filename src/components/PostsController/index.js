import React from 'react'

import PostsView from '../PostsView'

const baseURL = 'https://jsonplaceholder.typicode.com'

export default class PostsController extends React.Component {
  constructor() {
    super()
    this.state = {
      fetching: false,
      posts: [],
      error: '',
      users: []
    }
    this.handleFetchPosts = this.handleFetchPosts.bind(this)
  }
  async handleFetchPosts() {
    this.setState({ fetching: true, error: '' })
    try {
      const userResponse = await fetch(`${baseURL}/users`)
      const users = await userResponse.json()
      const postResponse = await fetch(`${baseURL}/posts`)
      const posts = await postResponse.json()
      this.setState({
        fetching: false,
        posts,
        users
      })
    } catch (err) {
      this.setState({
        fetching: false,
        error: 'Error fetching data'
      })
    }
  }
  render() {
    const { state } = this
    return <PostsView {...state} requestFetchPosts={this.handleFetchPosts} />
  }
}
