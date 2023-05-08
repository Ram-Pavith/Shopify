import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {persiststore,store} from './store.js'
import './index.css'
import App from './App.js'
import * as serviceWorker from './serviceWorker.js'
import { PersistGate } from "redux-persist/es/integration/react.js";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={"loading"} persistor={persiststore}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
