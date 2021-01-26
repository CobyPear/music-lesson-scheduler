import React, { useState, useEffect } from 'react'
import Calender from 'react-calendar'
import '../css/Home.css'
import 'react-calendar/dist/Calendar.css'

import { useDispatch, useSelector } from 'react-redux'

const Home = ({ history }) => {

    const [calValue, setCalValue] = useState(new Date())
console.log(calValue)
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo === null || userInfo === undefined) {
            history.push('/login')
        }
        // get lessons associated with user so we can display them
    }, [history]);

    return (
        <>
        <div className='row'>
            <h1>Welcome {userInfo && userInfo.name}</h1>
        </div>
        <div className='row'>
            <Calender
                onChange={setCalValue}
                value={calValue} 
                />
        </div>
        </>
    )
}

export default Home
