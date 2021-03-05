import React from 'react'
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'

const navlink = [
  { title: 'My Lessons', path: '/home' },
  { title: 'Schedule a Lesson', path: '/schedulelesson' },
]

const Header2 = () => {
  return (
    <AppBar>
      <Toolbar></Toolbar>
    </AppBar>
  )
}

export default Header2
