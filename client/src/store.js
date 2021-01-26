import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userDetailsReducer, userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
})

let userInfoFromStorage = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
console.log(userInfoFromStorage)
if (userInfoFromStorage === undefined) {
    sessionStorage.clear()
}

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage
    }
}


const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store