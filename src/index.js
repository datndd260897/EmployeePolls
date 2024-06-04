import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import reducer from './reducer'
import middleware from './middleware'

const store = createStore(reducer, middleware)
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
