import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ResponsiveHeader from './components/ResponsiveHeader'
import Welcome from './screens/Welcome'
import Login from './components/Login'
import SignUp from './components/Signup'
import Home from './screens/Home'
import { ScheduleLesson } from './screens/ScheduleLesson'


function App(props) {
  return (
    <>
    <Router>
      <Route component={ResponsiveHeader} />
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
