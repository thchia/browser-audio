import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import PostsView from '../PostsView'
import TracksView from '../TracksView'
import NavigationLink from '../NavigationLink'

class App extends Component {
  render() {
    return (
      <div>
        <nav style={styles.navigationContainer}>
          <ul style={styles.navigationList}>
            <NavigationLink to="/" exact label="Posts" />
            <NavigationLink to="/tracks" label="Tracks" />
          </ul>
        </nav>
        <Route exact path="/" component={PostsView} />
        <Route path="/tracks" component={TracksView} />
      </div>
    )
  }
}

export default App

export const styles = {
  container: {},
  navigationContainer: {
    backgroundColor: 'darkGrey'
  },
  navigationList: {
    margin: 0
  }
}
