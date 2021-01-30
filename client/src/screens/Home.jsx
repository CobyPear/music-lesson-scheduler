import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useDispatch, useSelector } from 'react-redux'
import { lessonsByUserId } from '../actions/lessonActions'
import '../css/Home.css'
import 'react-calendar/dist/Calendar.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    button: {
        backgroundColor: theme.palette.primary.main,
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




    function handleClick(e) {

    }
    return (
        <div className={classes.root}>
            <div className='row'>
                <h1>Welcome {userInfo && userInfo.name}</h1>
            </div>
            <div className="row">
                {lessonsLoading ? (<CircularProgress />) : lessonsError ? (<p>lessonsError</p>) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Length</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Paid</th>
                            </tr>
                        </thead>
                        <tbody onClick={handleClick}>
                            {flatLessons && flatLessons.map((x, i) => (
                                <tr key={i}>
                                    <td>{x.date}</td>
                                    <td>{x.time}</td>
                                    <td>{x['length']}</td>
                                    <td>{x.location}</td>
                                    <td>{x.price}</td>
                                    <td>{x['Paid'] === true ? 'yes' : 'no'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
                }

            </div>
            {/* {lessonLoading !== undefined ? (
                <CircularProgress />
            ) : filteredLesson ? (
                Object.keys(filteredLesson).map((x, i) => {
                    return (
                        <div className='row' key={i}>
                            <p>{x}: </p><p>{' ', filteredLesson[x]}</p>
                        </div>
                    )
                })
            ) : lessonError ? (<p>{lessonError}</p>) : null

            } */}
        </div>
    )
}

export default Home
