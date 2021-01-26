import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userDetailsReducer, userLoginReducer } from './reducers/userReducers'
import { lessonsByUserIdReducer } from './reducers/lessonReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    getLessonsByUserId: lessonsByUserIdReducer
})

let userInfoFromStorage = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
console.log(userInfoFromStorage)

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage
    }
}


const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store