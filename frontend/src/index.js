import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {persistor,store} from './store.js'
import './bootstrap.min.css'
import './index.css'
import App from './App.js'
import * as serviceWorker from './serviceWorker.js'
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={"loading"} persistor={persistor}> */}
      <App />
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
