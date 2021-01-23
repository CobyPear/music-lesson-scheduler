import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {login} from '../actions/userActions'


const Home = ({ history }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        // if (!userInfo) {
        //     dispatch()
        // }
        // if (!document.cookies) {
        //     history.push('/login')
        // }
    }, [userInfo]);
    return (

        <div>
            
        </div>
    )
}

export default Home
