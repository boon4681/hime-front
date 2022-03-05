import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/style/index.pcss'
import './assets/style/index.scss'
import {
  BrowserRouter,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector('main')
)