import React from 'react'

import GroupedPosts from '../GroupedPosts'
import Post from '../Post'
import connector from './container'

/**
 * TODO:
 * Test that GroupedPosts is shown if groupByUserId is true
 * Test that Post is shown if groupByUserId is false
 * Test for 'Loading...' vs 'Fetch Posts' text
 * Test for props being called when various inputs are changed
 */

export class PostsView extends React.Component {
  renderPosts(posts) {
    if (posts.length === 0 || Object.keys(posts || []).length === 0)
      return <div style={styles.empty}>Click 'Fetch Posts' to get posts</div>
    if (this.props.groupByUserId) {
      return <GroupedPosts posts={posts} />
    }
    return posts.map(post => <Post key={post.id} {...post} />)
  }

  render() {
    const { props } = this
    return (
      <div>
        <div style={styles.toolbar}>
          <button style={styles.button} onClick={props.requestFetchPosts}>
            {props.fetching || props.fetchingUsers
              ? 'Loading...'
              : 'Fetch Posts'}
          </button>
          <label style={styles.label}>Sort By</label>
          <select
            style={styles.select}
            onChange={this.props.handleChangeSortBy}
            value={props.sortBy}
          >
            <option value="title">Title</option>
            <option value="username">Username</option>
          </select>
          <select
            style={styles.select}
            onChange={props.handleChangeSortOrder}
            value={props.sortOrder}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <span style={styles.or}>or</span>
          <label style={styles.label} htmlFor="groupByUserId">
            Group By User ID
          </label>
          <input
            id="groupByUserId"
            type="checkbox"
            checked={props.groupByUserId}
            onChange={props.toggleGroupByUserId}
          />
        </div>
        {props.error ? <div style={styles.error}>{props.error}</div> : null}
        <div>
          {props.fetching || props.fetchingUsers
            ? 'Loading...'
            : this.renderPosts(props.posts)}
        </div>
      </div>
    )
  }
}

export default connector(PostsView)

export const styles = {
  toolbar: {
    backgroundColor: '#e0e0e0',
    padding: 5
  },
  or: {
    margin: '0 10px'
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
  },
  empty: {
    padding: 20
  },
  error: {
    padding: 20,
    backgroundColor: '#ff3c5e',
    color: 'white'
  }
}
