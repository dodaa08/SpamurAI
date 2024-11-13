import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // This sets a base URL for all requests
});

function SignUp() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const SignUp = async () => {
        try {
            const response = await api.post("/signup", {
                email: Email,
                password: Password
            });

            console.log(response.data);
            alert("User Created Successfully");
        } catch (error) {
            console.error("Error occurred:", error);
            alert("Error occurred while signing up");
        }
    };

    return (
        <>
            <div className='bg-black h-screen'>
                <div className='flex justify-center text-white'>
                    <h1 className='text-xl py-5'>Sign Up</h1>
                </div>
                <div className='space-y-5 py-20'>
                    <div className='flex justify-center'>
                        <input
                            type="text"
                            placeholder='Enter Email...'
                            className='rounded px-10 py-2'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <input
                            type="password"
                            placeholder='Enter Password...'
                            className='rounded px-10 py-2'
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            onClick={SignUp}
                            className='bg-blue-400 rounded-xl py-3 px-5 text-black hover:bg-blue-300 transition duration-200'>
                            Sign-Up
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
