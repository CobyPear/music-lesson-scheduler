import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLesson  as lessonCreate } from '../actions/lessonActions'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Select, FormControl, MenuItem, TextField, InputLabel } from '@material-ui/core'

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    formEl: {
        margin: theme.spacing(2)
    },
    datePicker: {
        margin: theme.spacing(1)
    },
    center: {
        marginLeft: '50%'
    }

}))

export const MaterialUIPickers = ({ selectedDate, handleDateChange, classes }) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="center">
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
        <div className={classes.root}>
            <form onSubmit={submitHandler}>
                <Grid container justify='center' spacing={5}>
                    <MaterialUIPickers
                        selectedDate={selectedDate}
                        handleDateChange={handleDateChange}
                        classes={classes}
                    />
                    <Grid item xs={1}>
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
                    </Grid>
                    <Grid item xs={2}>
                        <p>{`$ ${lessonPrice}`}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            label='Location'
                            value={lessonLocation}
                            onChange={(e) => setLessonLocation(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className={classes.center} type='submit'>Submit</Button>
                    </Grid>
                    <Grid>
                        {createLessonLoading && <CircularProgress />}
                        {success && <p>Success! Lesson Scheduled</p>}
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

