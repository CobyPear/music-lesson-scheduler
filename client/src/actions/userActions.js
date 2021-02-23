import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
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

        const data  = await resp.json()
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

        // set user info and token in session storage, then change to homepage
        window.location.href = '/home'
        sessionStorage.setItem('userInfo', JSON.stringify(data.userData))
        sessionStorage.setItem('token', JSON.stringify(data.token))
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
        
        if (data === undefined || data.message) {
            console.log(data)
            throw data.message
        } else {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            console.log(data)
            window.location.href = '/home'
            sessionStorage.setItem('userInfo', JSON.stringify(data.userData))
            sessionStorage.setItem('token', JSON.stringify(data.token))
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error
        })
    }
}

export const logout = () => (dispatch) => {
    sessionStorage.removeItem('userInfo')
    sessionStorage.removeItem('token')
    dispatch({ type: USER_LOGOUT })

    fetch('/api/users/logout')
}

export const getUserDetails = (id) => async(dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const response = await fetch(`/api/users/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
        
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
        sessionStorage.setItem('userInfo', JSON.stringify(data.userData))
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}
