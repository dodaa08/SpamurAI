import React from 'react'
import Header from '../components/Header'

function SignIn() {
    return (
        <>
        <div className='bg-black h-max'>
            <div className='flex justify-center'>
                <h1>SignUp (JWT AUth with Email for now...)</h1>
            </div>
            <div className='flex flex-col justify-center'>
                <div>
                    <input type="text" placeholder='Enter Email...'/>
                </div>
            </div>
        </div>
        </>
    )
}

export default SignIn
