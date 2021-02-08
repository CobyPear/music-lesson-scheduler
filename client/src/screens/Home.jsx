import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import { useDispatch, useSelector } from 'react-redux'
import { lessonsByUserId } from '../actions/lessonActions'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core'
import '../css/Home.css'
import 'react-calendar/dist/Calendar.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    table: {
        minWidth: 650
    },
    xIcon: {
        color: theme.palette.error.light
    },
    checkIcon: {
        color: theme.palette.success.light
    },
    button: {
        backgroundColor: theme.palette.success.light,
        color: 'white',
        marginTop: '5px',
        padding: '10px'
    }
}))


const Home = ({ history }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const getLessonsByUserId = useSelector(state => state.getLessonsByUserId)
    const { lessonsLoading, lessonsError, lessons, flatLessons } = getLessonsByUserId

    const getLessonById = useSelector(state => state.getLessonById)
    const { lessonLoading, lessonError, lesson } = getLessonById
    console.log(flatLessons)

    useEffect(() => {
        if (userInfo === null || userInfo === undefined) {
            history.push('/login')
        }
        const getLessons = () => {
            dispatch(lessonsByUserId(userInfo._id))
        }
        if (userInfo) {
            getLessons()
        }
    }, [dispatch, history, userInfo])

    function createData(date, time, length, location, price, paid) {
        return { date, time, length, location, price, paid }
    }

    const rows = flatLessons ? flatLessons.map((x, i) => createData(x.date, x.time, x['length'], x.location, x.price, x.paid)) : []

    function handleClick(e) {
        // Payment button logic goes here!
        // Button will show user a modal of their lesson
        // then it will have another payment button
        // user can then click that button and it will take them to payment portal
    }
    return (
        <div className={classes.root}>
            <div className='row'>
                <h1>Welcome {userInfo && userInfo.name}</h1>
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='lessons-table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Length</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Paid</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component='th' scope='
                                    row'>
                                    {row.date}
                                </TableCell>
                                <TableCell component='th' scope='
                                    row'>
                                    {row.time}
                                </TableCell>
                                <TableCell component='th' scope='
                                    row'>
                                    {row.length}
                                </TableCell>
                                <TableCell component='th' scope='
                                    row'>
                                    {row.location}
                                </TableCell>
                                <TableCell component='th' scope='
                                    row'>
                                    {row.price}
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {!row.paid ? <ClearIcon className={classes.xIcon} /> : <DoneIcon className={classes.checkIcon} />}
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {!row.paid && (
                                        <Button
                                            className={classes.button}>
                                            {'Pay'}
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Home
