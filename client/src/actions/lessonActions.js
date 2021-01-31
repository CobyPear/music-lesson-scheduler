import {
    LESSON_BY_USER_ID_REQUEST,
    LESSON_BY_USER_ID_SUCCESS,
    LESSON_BY_USER_ID_FAIL,
    LESSONS_CREATE_REQUEST,
    LESSONS_CREATE_SUCCESS,
    LESSONS_CREATE_FAIL,
    LESSONS_FIND_BY_LESSON_ID_REQUEST,
    LESSONS_FIND_BY_LESSON_ID_SUCCESS,
    LESSONS_FIND_BY_LESSON_ID_FAIL,
    FLAT_LESSON_TRY,
    FLAT_LESSON_ADD,
    FLAT_LESSON_FAIL
} from '../constants/lessonConstants'

export const lessonsByUserId = (id) => async(dispatch) => {
    let token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : ''
    try {
        dispatch({ type: LESSON_BY_USER_ID_REQUEST })

        const response = await fetch(`/api/lessons/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        dispatch({
            type: LESSON_BY_USER_ID_SUCCESS,
            payload: data
        })

        dispatch({ type: FLAT_LESSON_TRY })
        let flatLessons = []
        data.forEach(x => flatLessons.push({
            date: new Date(x.date).toLocaleDateString(),
            time: x.time,
            length: x['length'],
            location: x.location,
            price: x.price,
            'Paid': x.isPaid
        }))
        dispatch({
            type: FLAT_LESSON_ADD,
            payload: flatLessons
        })

    } catch (error) {
        dispatch({
            type: FLAT_LESSON_FAIL,
            payload: error ? error : null
        })
        dispatch({
            type: LESSON_BY_USER_ID_FAIL,
            payload: error ? error : null
        })
    }
}

export const lessonById = (id) => async(dispatch) => {
    // let token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : ''
    try {
        dispatch({ type: LESSONS_FIND_BY_LESSON_ID_REQUEST })

        const response = await fetch(`/api/lessons/findlesson/${id}`, {
            method: 'GET',
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // }
        })
        const data = await response.json()
        console.log(data)
        dispatch({
            type: LESSONS_FIND_BY_LESSON_ID_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LESSONS_FIND_BY_LESSON_ID_FAIL,
            payload: error ? error : null
        })
    }
}

export const createLesson = (lessonData) => async(dispatch) => {
    let token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : ''

    try {
        dispatch({ type: LESSONS_CREATE_REQUEST })
        const response = await fetch(`api/lessons/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lessonData)
        })

        console.log()
        const { data } = await response.json()

        dispatch({
            type: LESSONS_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LESSONS_CREATE_FAIL,
            payload: error ? error : null
        })
    }
}