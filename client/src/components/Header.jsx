import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import logo from '../images/music-lessons-logo.png'


/*

 0-------------------------------------------------------0
 |                                                       |
 | TODO: make navbar responsive, implement login/singup  |
 |   buttons, fix button styling                         |
 0-------------------------------------------------------0

*/

// Functions are from material-ui docs components/tabs
function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index} id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )

}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={e => e.preventDefault()}
            {...props}
        />
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    title: {
        flexGrow: 1,
        marginRight: '10px',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    login: {
        color: '#ffffff',
        backgroundColor: theme.palette.primary.dark,
        marginLeft: '48px'
    },
    signUp: {
        color: '#ffffff',
        backgroundColor: theme.palette.primary.dark,
        marginLeft: '20px'
    }
}))

export default function NavTabs({ history }) {
    const classes = useStyles()
    const [value, setValue] = useState(0)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const handleChange = (event, newValue) => setValue(newValue)


    const login = () => {
        console.log('clicked')
        window.location.href = '/login'
    }

    const signup = () => {
        // put logic here to direct user to homepage if already logged in
        // also, direct to different sign up form that asks for user's instrument
        window.location.href = '/login'
    }
    const logoutHandler = () => {
        dispatch(logout())
        window.location.href = '/login'
    }

    return (
        <div className={classes.root}>
            <AppBar
                position='static'
                title={logo}
            >
                <Toolbar>
                    <Typography
                        variant='h5'
                        className={classes.title}
                    >
                        Lesson Scheduler
                </Typography>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs">
                        <LinkTab href='/mylessons' label="My Lessons" {...a11yProps(0)} />
                        <LinkTab href='/schedulelesson' label="Schedule a Lesson" {...a11yProps(1)} />
                    </Tabs>
                    <Button className={classes.login} onClick={login}>Login</Button>
                    {userInfo !== null ? (
                        <Button className={classes.signUp} onClick={logoutHandler}>Logout</Button>
                    ) : (
                            <Button className={classes.signUp} onClick={signup}>Signup</Button>
                        )}

                </Toolbar>
            </AppBar>
            <TabPanel value={value} index={0}>
            </TabPanel>
            <TabPanel value={value} index={1}>
            </TabPanel>

        </div>
    )
}



