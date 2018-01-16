import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import App from './components/App'
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
