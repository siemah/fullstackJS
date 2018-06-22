import React from 'react'
import { hydrate } from 'react-dom'
import App from '../shared/App'

hydrate(
    <App data={window.__INITIAL_STATE__} />,
    document.querySelector('#app')
)