import {
    LESSON_BY_USER_ID_REQUEST,
    LESSON_BY_USER_ID_SUCCESS,
    LESSON_BY_USER_ID_FAIL,
    LESSONS_CREATE_REQUEST,
    LESSONS_CREATE_SUCCESS,
    LESSONS_CREATE_FAIL,
    LESSONS_FIND_BY_LESSON_ID_REQUEST,
    LESSONS_FIND_BY_LESSON_ID_SUCCESS,
    LESSONS_FIND_BY_LESSON_ID_FAIL
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
        console.log(data)

        dispatch({
            type: LESSON_BY_USER_ID_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LESSON_BY_USER_ID_FAIL,
            payload: error ? error : null
        })
    }
}