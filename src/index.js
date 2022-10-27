import React from "react"
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from "./App"
import store from './app/store'

const container = document.getElementById('root')
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Router>
        <Provider store={store}>
        <App tab="home" />
        </Provider>
    </Router>
);