import React, { useState, useEffect } from 'react'
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
    makeStyles,
    Drawer,
    MenuItem,
} from '@material-ui/core'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import MenuIcon from '@material-ui/icons/Menu'

const navlinks = [
    { title: 'My Lessons', path: '/home' },
    { title: 'Schedule a Lesson', path: '/schedulelesson' },
]

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        height: '20px'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    navDisplayFlex: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    linkText: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: 'white'
    },
    menuItemText: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: 'black'
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
    },
    menuIcon: {
        marginRight: theme.spacing(3)
    },
    drawerButtons: {
        color: '#ffffff',
        backgroundColor: theme.palette.secondary.dark,
    },
    column: {
        display: 'flex',
        height: '3rem',
        flexDirection: 'column',
        justifyContent: 'space-around'

    }
}))

const ResponsiveHeader = ({ history }) => {

    const classes = useStyles()

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isMobile, setIsMobile] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {
        // from https://betterprogramming.pub/making-a-basic-header-responsive-with-materialui-and-react-2198fac923c8
        const setResponsiveness = () => window.innerWidth < 900 ? setIsMobile(true) : setIsMobile(false)

        setResponsiveness()
        window.addEventListener('resize', () => setResponsiveness())
    }, [userInfo])

    const login = () => {
        history.push('/login')
    }

    const signup = () => {
        // put logic here to direct user to homepage if already logged in
        // also, direct to different sign up form that asks for user's instrument
        history.push('/signup')
    }

    const logoutHandler = () => {
        dispatch(logout())
        isMobile && setDrawerOpen(!drawerOpen)
        history.push('/login')
    }

    const displayMobile = () => {

        const getDrawerChoices = () => {
            const mobileNavlinks = [
                { title: 'My Lessons', path: '/home' },
                { title: 'Schedule a Lesson', path: '/schedulelesson' },
                { title: 'Login', path: '/login' },
            ]
            return (
                <>
                    {
                        mobileNavlinks.map(({ title, path }) => {
                            return (
                                <Link color='inherit' href={path} key={title} className={classes.menuItemText}>
                                    <MenuItem primary={title}>{title}</MenuItem>
                                </Link>
                            )
                        })

                    }
                    <div className={classes.column}>

                        {userInfo?._id && (
                            <Button className={classes.drawerButtons} onClick={logoutHandler}>Logout</Button>
                        )}

                    </div>
                </>
            )
        }

        return (
            <>
                <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    aria-haspopup={true}
                    onClick={() => setDrawerOpen(!drawerOpen)}
                >
                    <MenuIcon className={classes.menuIcon} />
                </IconButton>
                <Drawer
                    anchor='left'
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(!drawerOpen)}
                >
                    <div>{getDrawerChoices()}</div>
                </Drawer>
                <span><MusicNoteIcon /></span>
            </>
        )
    }

    const displayDesktop = () => {
        return (
                <Container maxWidth='md' className={classes.flex}>
                    <IconButton edge='start'
                        color='inherit'
                        aria-label='home'>
                        <MusicNoteIcon fontSize='large' />
                    </IconButton>
                    <List
                        className={classes.navDisplayFlex}
                        component="nav"
                        aria-labelledby="main navigation">
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
        )

    }

    return (
        <AppBar height='25%'>
            <Toolbar>
                {
                    isMobile ? displayMobile() : displayDesktop()
                }
            </Toolbar>
        </AppBar>
    )
}

export default ResponsiveHeader
