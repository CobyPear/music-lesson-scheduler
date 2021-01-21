import React, { useState } from 'react'
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
        marginRight: '10px'
    },
    button: {
        color: '#ffffff'
    }
}))

export default function NavTabs() {
    const classes = useStyles()
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => setValue(newValue)

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
                        <Button className={classes.button}>Login</Button>
                        <Button className={classes.button}>Signup</Button>
                    </Tabs>
                </Toolbar>
            </AppBar>
            <TabPanel value={value} index={0}>
            </TabPanel>
            <TabPanel value={value} index={1}>
            </TabPanel>

        </div>
    )
}



