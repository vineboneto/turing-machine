import React from 'react'
import ReactDOM from 'react-dom'
import { makeApp } from './main/factories'
import 'normalize.css'

const App = makeApp()

ReactDOM.render(<React.StrictMode>{App}</React.StrictMode>, document.getElementById('root'))
