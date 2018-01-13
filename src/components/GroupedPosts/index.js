import React from 'react'

import Post from '../Post'

export default class GroupedPosts extends React.Component {
  constructor() {
    super()
    this.state = {
      hidden: []
    }
    this.toggleHidePosts = this.toggleHidePosts.bind(this)
  }
  toggleHidePosts(userId) {
    const hidden = [...this.state.hidden]
    const hiddenIndex = hidden.findIndex(user => user === userId)
    const postsAreHidden = hiddenIndex > -1
    if (postsAreHidden) {
      hidden.splice(hiddenIndex)
      this.setState({ hidden })
    } else {
      this.setState({ hidden: [...hidden, userId] })
    }
  }
  render() {
    const { props, state } = this
    return (
      <div>
        {Object.keys(props.posts).map(user => {
          const postsAreHidden = state.hidden.find(id => id === user)
          return (
            <div key={user} style={styles.user}>
              <strong>Username</strong>: {props.posts[user].username}
              <button
                style={styles.button}
                onClick={() => this.toggleHidePosts(user)}
              >
                {postsAreHidden ? 'Show' : 'Hide'} Posts
              </button>
              {postsAreHidden
                ? null
                : props.posts[user].posts.map(post => (
                    <Post key={post.id} {...post} />
                  ))}
            </div>
          )
        })}
      </div>
    )
  }
}

export const styles = {
  user: {
    padding: 20
  },
  button: {
    marginLeft: 10,
    padding: 10,
    border: 'none',
    backgroundColor: 'lightGrey',
    borderRadius: 6
  }
}
