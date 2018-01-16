import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import PostsView from '../PostsController'
import TracksController from '../TracksController'
import NavigationLink from '../NavigationLink'

class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <nav style={styles.navigationContainer}>
          <ul style={styles.navigationList}>
            <NavigationLink to="/" exact label="Posts" />
            <NavigationLink to="/tracks" label="Tracks" />
          </ul>
        </nav>
        <Route exact path="/" component={PostsView} />
        <Route path="/tracks" component={TracksController} />
      </div>
    )
  }
}

export default App

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  navigationContainer: {
    backgroundColor: 'darkGrey'
  },
  navigationList: {
    margin: 0
  }
}
