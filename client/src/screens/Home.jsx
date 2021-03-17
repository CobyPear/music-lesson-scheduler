import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import { useDispatch, useSelector } from 'react-redux'
import { lessonsByUserId } from '../actions/lessonActions'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { PaymentDialog } from '../components/PaymentDialog'
import '../css/Home.css'
import 'react-calendar/dist/Calendar.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        top: 50
    },
    table: {
        minWidth: 650,

    },
    tableHeaders: {
        fontSize: '1.3em'
    },
    xIcon: {
        color: theme.palette.error.light
    },
    checkIcon: {
        color: theme.palette.success.main
    },
    button: {
        backgroundColor: theme.palette.success.dark,
        color: 'white',
        marginTop: '5px',
        padding: '10px'
    },
    keyRed: {
        backgroundColor: 'rgba(229, 115, 115, 0.4)',
        width: 25,
        height: 25
    },
    keyGreen: {
        backgroundColor: 'rgba(129, 199, 132, 0.4)',
        width: 25,
        height: 25,
    },
    keyBlue: {
        backgroundColor: 'rgba(100, 181, 246, 0.4)',
        width: 25,
        height: 25
    }
}))


const Home = ({ history }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const getLessonsByUserId = useSelector(state => state.getLessonsByUserId)
    const { lessonsLoading, lessonsError, lessons, flatLessons } = getLessonsByUserId

    const getLessonById = useSelector(state => state.getLessonById)
    const { lessonLoading, lessonError, lesson } = getLessonById
    useEffect(() => {
        if (userInfo === null || userInfo === undefined) {
            history?.push('/login')
        }
        const getLessons = () => {
            dispatch(lessonsByUserId(userInfo._id))
        }
        if (userInfo) {
            getLessons()
        }

        const addPayPalScript = async () => {
            const response = await fetch('/api/config/paypal', {
                method: 'GET'
            })
            const clientId = await response.text()
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onLoad = () => setSdkReady(true)
            document.body.appendChild(script)
        }
        if (!sdkReady) {
            addPayPalScript()
        }
    }, [dispatch, history, userInfo, lessons?.isPaid])

    function createData(date, time, length, location, price, paid, lessonId) {
        return { date, time, length, location, price, paid, lessonId }
    }

    // maps lessons to our createData function
    const temp = flatLessons ? flatLessons.map((x, i) => createData(x.date, x.time, x['length'], x.location, x.price, x.paid, x.lessonId)) : []
    // sorts lessons by date
    const rows = temp.sort((a, b) => {
        let dateA = new Date(a.date)
        let dateB = new Date(b.date)
        return dateB - dateA
    })

    return (
        <div className={classes.root}>
            <div className='row'>
                <h1>Welcome, {userInfo && userInfo.name}!</h1>
            </div>
            {flatLessons?.length > 0 ?
                (
                    <>
                        <div className="row">

                            <div className="row">
                                <div className={classes.keyBlue}>
                                </div>
                                <span style={{ marginRight: '5px' }}>Today</span>
                            </div>
                            <div className="row">
                                <div className={classes.keyGreen}>
                                </div>
                                <span style={{ marginRight: '5px' }}>Future</span>
                            </div>
                            <div className="row">
                                <div className={classes.keyRed}>
                                </div>
                                <span style={{ marginRight: '5px' }}>Past</span>
                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label='lessons-table'>
                                <TableHead >
                                    <TableRow >
                                        {
                                            ['Date', 'Time', 'Length', 'Location', 'Price', 'Paid'].map((colName, i) => (
                                                <TableCell key={i} className={classes.tableHeaders}>{colName}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={index} style={new Date(row.date) > Date.now() ? { backgroundColor: 'rgba(129, 199, 132, 0.4)' } : new Date(row.date).toLocaleDateString() === new Date(Date.now()).toLocaleDateString() ? { backgroundColor: 'rgba(100, 181, 246, 0.4)' } : { backgroundColor: 'rgba(229, 115, 115, 0.4)' }}>
                                            <TableCell component='th' scope='row'>
                                                {row.date}
                                            </TableCell>
                                            <TableCell component='th' scope='row'>
                                                {row.time}
                                            </TableCell>
                                            <TableCell component='th' scope='row'>
                                                {row.length}
                                            </TableCell>
                                            <TableCell component='th' scope='ow'>
                                                {row.location}
                                            </TableCell>
                                            <TableCell component='th' scope='row'>
                                                ${row.price}
                                            </TableCell>
                                            <TableCell component='th' scope='row'>
                                                {!row.paid ? <ClearIcon className={classes.xIcon} /> : <DoneIcon className={classes.checkIcon} />}
                                            </TableCell>
                                            <TableCell component='th' scope='row'>
                                                {!row.paid && (
                                                    <>
                                                        <PaymentDialog
                                                            amount={row.price.toString()}
                                                            lessonId={row.lessonId}
                                                        />
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <h2 style={{ display: 'flex', justifyContent: 'center' }}> No lessons yet. Sign up for a lesson!</h2>
                )
            }
        </div >
    )
}

export default Home
