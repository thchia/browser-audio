import React from 'react'

import Post from '../Post'

export default class PostsView extends React.Component {
  constructor() {
    super()
    this.state = {
      sortBy: 'title',
      sortOrder: 'asc'
    }
    this.handleChangeSortBy = this.handleChangeSortBy.bind(this)
    this.handleChangeSortOrder = this.handleChangeSortOrder.bind(this)
  }
  handleChangeSortBy(e) {
    const sortBy = e.target.value
    this.setState({ sortBy })
  }
  handleChangeSortOrder(e) {
    const sortOrder = e.target.value
    this.setState({ sortOrder })
  }
  renderPosts(posts) {
    let sortedPosts = []
    if (this.state.sortBy && this.state.sortOrder) {
      const { sortBy, sortOrder } = this.state
      sortedPosts = [...posts].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }
    return sortedPosts.map(post => <Post key={post.id} {...post} />)
  }
  render() {
    const { props, state } = this
    return (
      <div>
        {/* <div>Posts</div> */}
        <div style={styles.toolbar}>
          <button style={styles.button} onClick={props.requestFetchPosts}>
            {props.fetching ? 'Loading...' : 'Fetch Posts'}
          </button>
          <label style={styles.label}>Sort By</label>
          <select
            style={styles.select}
            onChange={this.handleChangeSortBy}
            value={state.sortBy}
          >
            <option value="title">Title</option>
            <option value="userId">User ID</option>
          </select>
          <select
            style={styles.select}
            onChange={this.handleChangeSortOrder}
            value={state.sortOrder}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          {props.fetching ? 'Loading...' : this.renderPosts(props.posts)}
        </div>
      </div>
    )
  }
}

export const styles = {
  toolbar: {
    backgroundColor: '#e0e0e0',
    padding: 5
  },
  button: {
    color: 'white',
    height: 40,
    width: 125,
    padding: '0 20px',
    fontSize: '15px',
    backgroundColor: '#4b9e4b',
    border: 'none',
    borderRadius: 6
  },
  label: {
    marginLeft: 20
  },
  select: {
    height: 30,
    marginLeft: 20
  }
}