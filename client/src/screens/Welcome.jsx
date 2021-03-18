import React from 'react'
import '../css/Welcome.css'

const Welcome = () => {
    return (
        <>
            <div style={{ marginTop: '100px' }} className='row'>
                <h1 >Welcome</h1>
            </div>
            <div className="row">
                <a className='login' href="/login">Log In</a>
                <a href="/signup">Sign Up</a>
            </div>
        </>
    )
}

export default Welcome
