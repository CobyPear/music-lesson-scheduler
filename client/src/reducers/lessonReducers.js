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
    FLAT_LESSON_ADD,
    FLAT_LESSON_FAIL,
    FLAT_LESSON_TRY
} from '../constants/lessonConstants'

export const lessonsByUserIdReducer = (state = { lessons: [], flatLessons: [] }, action) => {
    switch (action.type) {
        case LESSON_BY_USER_ID_REQUEST:
            return { loading: true, lessons: [] }
        case LESSON_BY_USER_ID_SUCCESS:
            return { loading: false, lessons: action.payload }
        case LESSON_BY_USER_ID_FAIL:
            return { loading: false, error: action.payload }
            case FLAT_LESSON_TRY:
                return { loading: true, flatLessons: [], lessons: state.lessons }
            case FLAT_LESSON_ADD:
                return { loading: false, flatLessons: action.payload, lessons: state.lessons }
            case FLAT_LESSON_FAIL:
                return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const lessonByIdReducer = (state = { lesson: {} }, action) => {
    switch (action.type) {
        case LESSONS_FIND_BY_LESSON_ID_REQUEST:
            return { loading: true, lesson: {} }
        case LESSONS_FIND_BY_LESSON_ID_SUCCESS:
            return { loading: false, lesson: action.payload }
        case LESSONS_FIND_BY_LESSON_ID_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const flatLessonsReducer = (state = { flatLessons: [] }, action) => {
    switch (action.type) {
        case FLAT_LESSON_TRY:
            return { loading: true, flatLessons: [] }
        case FLAT_LESSON_ADD:
            return { loading: false, flatLessons: action.payload }
        case FLAT_LESSON_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const createLessonReducer = (state = {}, action) => {
    switch (action.type) {
        case LESSONS_CREATE_REQUEST:
            return { loading: true }
        case LESSONS_CREATE_SUCCESS:
            return { loading: false, success: true, createdLesson: action.payload }
        case LESSONS_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}