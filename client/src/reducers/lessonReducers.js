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

export const lessonsByUserIdReducer = (state = {lessons: [] }, action) => {
    switch (action.type) { 
        case LESSON_BY_USER_ID_REQUEST:
            return { loading: true, lessons: [] }
        case LESSON_BY_USER_ID_SUCCESS:
            return { loading: false, lessons: action.payload }
        case LESSON_BY_USER_ID_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}