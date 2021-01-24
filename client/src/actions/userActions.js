import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from '../constants/userConstants'

export const register = (name, email, password, instrument) => async(dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const resp = await fetch('/api/users', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                instrument: instrument
            })

        })

        const { data } = await resp.json()
        console.log(data)
        sessionStorage.setItem('userInfo', JSON.stringify({...data}))
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const userDetails = { email: email, password: password }

        const response = await fetch('/api/users/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
        const data = await response.json()
        console.log(data)
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}
