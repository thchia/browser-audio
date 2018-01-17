import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './'
import rootReducer from '../../reducers'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={createStore(rootReducer)}>
      <Router>
        <App />
      </Router>
    </Provider>,
    div
  )
})
