import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { InputLabel } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import { Select, FormControl, MenuItem } from '@material-ui/core'

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export const MaterialUIPickers = ({ selectedDate, handleDateChange }) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="center">
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
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
    // const [value, setDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [lessonLength, setLessonLength] = useState(30)

    const dispatch = useDispatch()


    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo === null || userInfo === undefined) {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])


    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(selectedDate.toLocaleDateString())
        console.log(selectedDate.toLocaleTimeString())
        console.log(lessonLength)
        console.log(userInfo._id)

    }
    return (
        <Grid container justify='space-around' spacing={3}>
            <form onSubmit={submitHandler}>
                <MaterialUIPickers
                    selectedDate={selectedDate}
                    handleDateChange={handleDateChange}
                />
                <Grid>
                    <FormControl>
                        <InputLabel
                            id='lesson-length-select-label'>
                            Length
                                </InputLabel>
                        <Select
                            labelId='lesson-length-select-label'
                            id='lesson-length=select'
                            value={lessonLength}
                            onChange={(e) => setLessonLength(e.target.value)}
                        >
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={45}>45</MenuItem>
                            <MenuItem value={60}>60</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    <Button type='submit'>Submit</Button>
                </Grid>
            </form>
        </Grid>
    )
}

