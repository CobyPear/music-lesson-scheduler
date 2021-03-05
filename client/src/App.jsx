import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Header2 from './components/Header2'
import Welcome from './screens/Welcome'
import Login from './components/Login'
import SignUp from './components/Signup'
import Home from './screens/Home'
import { ScheduleLesson } from './screens/ScheduleLesson'


function App() {
  return (
    <>
    <Router>
      {/* <Header /> */}
      {/* <Header2 /> */}
      <Route path='/' exact component={Welcome} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />
      <Route path='/home' component={Home} />
      <Route path='/schedulelesson' component={ScheduleLesson} />
    </Router>
    </>
  );
}

export default App;
