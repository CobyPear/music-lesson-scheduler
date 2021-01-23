import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Home from './screens/Home'


function App() {
  return (
    <>
    <Router>
      <Header />
      <Route path='/login' component={Login} />
      <Route path='/home' component={Home} />
    </Router>
    </>
  );
}

export default App;
