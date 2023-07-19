import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/Login'
import Main from './components/Main'
import Register from './components/Register'
import Reports from './components/Report'

export default function App() {
  return (
    
    <BrowserRouter>
    <div>
      <Route path="/" exact component={Main}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/reports" component={Reports}/>
    </div>
    </BrowserRouter>
  )
}

