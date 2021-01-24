import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {refresh} from '../actions/userActions'


const Home = ({ history }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {

    }, []);
    return (

        <div>
            
        </div>
    )
}

export default Home
