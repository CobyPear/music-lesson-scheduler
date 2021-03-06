import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Link,
  Button,
  Container,
  makeStyles
} from '@material-ui/core'
import MusicNoteIcon from '@material-ui/icons/MusicNote'

const navlinks = [
  { title: 'My Lessons', path: '/home' },
  { title: 'Schedule a Lesson', path: '/schedulelesson' },
]

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: 'white'
  },
  login: {
    color: '#ffffff',
    backgroundColor: theme.palette.secondary.dark,
    marginLeft: '48px'
  },
  signUp: {
    color: '#ffffff',
    backgroundColor: theme.palette.secondary.dark,
    marginLeft: '20px'
  }
}))
const Header2 = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const login = () => {
    window.location.href = '/login'
  }

  const signup = () => {
    // put logic here to direct user to homepage if already logged in
    // also, direct to different sign up form that asks for user's instrument
    window.location.href = '/signup'
  }
  const logoutHandler = () => {
    dispatch(logout())
    window.location.href = '/login'
  }
  return (
    <AppBar>
      <Toolbar>
        <Container maxWidth='md' className={classes.flex}>
          <IconButton edge='start'
            color='inherit'
            aria-label='home'>
            <MusicNoteIcon fontSize='large' />
          </IconButton>
          <List
            className={classes.navDisplayFlex}
            component="nav"
            aria-labeled-by="main navigation">
            {
              navlinks.map(({ title, path }) => (
                <Link href={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </Link>
              ))
            }
            <Button className={classes.login} onClick={login}>Login</Button>
            {userInfo !== null ? (
              <Button className={classes.signUp} onClick={logoutHandler}>Logout</Button>
            ) : (
              <Button className={classes.signUp} onClick={signup}>Signup</Button>
            )}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Header2
