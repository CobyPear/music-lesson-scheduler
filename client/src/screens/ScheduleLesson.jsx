import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLesson as lessonCreate } from '../actions/lessonActions'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Select, FormControl, MenuItem, TextField, InputLabel, Container } from '@material-ui/core'


import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        border: 'solid black 1px',
        backgroundColor: 'rgba(120, 175, 245, 0.3)',
        marginTop: 100,
        justifyContent: 'center'
    },
    form: {
        flexGrow: 1,
        justifySelf: 'center',
        display: 'flex',
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    datePicker: {
        margin: theme.spacing(1)
    },
    price: {
        borderColor: 'red',
        color: theme.palette.success.dark,
        textShadow: '0px 0px 2px white ',
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '500px'
    },
    flexMobile: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '2rem',
        width: '85%'
    },
    topRow: {
        marginBottom: '30px'
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'center'
    },
    submitBtn: {
        color: theme.palette.primary.dark,
        backgroundColor: 'white',
        marginBottom: '1rem',
    },
}))

export const MaterialUIPickers = ({ selectedDate, handleDateChange, classes }) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="center" className={classes.topRow}>
                <KeyboardDatePicker
                    className={classes.datePicker}
                    margin="normal"
                    id="Date"
                    label="Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardTimePicker
                    className={classes.datePicker}
                    margin="normal"
                    id="Time"
                    label="Time"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}

export const ScheduleLesson = ({ history }) => {
    console.log(window.visualViewport)
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [lessonLength, setLessonLength] = useState(30)
    const [lessonLocation, setLessonLocation] = useState('Remote')
    const [lessonPrice, setLessonPrice] = useState('19.99')

    const dispatch = useDispatch()


    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const createLesson = useSelector(state => state.createLesson)
    const { createLessonLoading, createLessonError, success } = createLesson

    useEffect(() => {
        if (userInfo === null || userInfo === undefined) {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])


    const handleDateChange = (date) => {
        setSelectedDate(date);
    }
    const updatePrice = (lessonLength) => {
        if (lessonLength === 30) {
            setLessonPrice('19.99')
        } else if (lessonLength === 45) {
            setLessonPrice('28.99')
        } else if (lessonLength === 60) {
            setLessonPrice('34.99')
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        let data = {
            user: userInfo._id,
            date: selectedDate.toLocaleDateString(),
            time: selectedDate.toLocaleTimeString(),
            length: lessonLength,
            location: lessonLocation,
            price: lessonPrice
        }
        dispatch(lessonCreate(data))

    }
    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <form className={classes.form} onSubmit={submitHandler}>
                <Grid className={classes.root} container justify='center' spacing={1}>
                    <MaterialUIPickers
                        selectedDate={selectedDate}
                        handleDateChange={handleDateChange}
                        classes={classes}
                    />
                    <div className={window.visualViewport.width > 400 ? classes.flex : classes.flexMobile}>
                        <FormControl>
                            <InputLabel
                                id='lesson-length-select-label'>
                                Length
                                </InputLabel>
                            <Select
                                labelId='lesson-length-select-label'
                                id='lesson-length=select'
                                value={lessonLength}
                                onChange={(e) => {
                                    setLessonLength(e.target.value)
                                    updatePrice(e.target.value)
                                }}
                            >
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={45}>45</MenuItem>
                                <MenuItem value={60}>60</MenuItem>
                            </Select>
                        </FormControl>
                        <p className={classes.price}><strong>Price: </strong>{`$ ${lessonPrice}`}</p>
                        <TextField
                            label='Location'
                            value={lessonLocation}
                            onChange={(e) => setLessonLocation(e.target.value)}
                        />
                    </div>
                    <Grid item xs={12} className={classes.buttonRow}>
                        <Button className={classes.submitBtn} type='submit'>Submit</Button>
                    </Grid>
                    <Grid>
                        {createLessonLoading && <CircularProgress />}
                        {success && <p>Success! Lesson Scheduled</p>}
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

