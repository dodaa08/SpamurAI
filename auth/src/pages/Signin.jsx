import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const signup = async () => {
       try{
        const response = await axios.post('http://localhost:3000/auth/signin', {
            email,
            password
        });
        localStorage.setItem('token', response.data.token);
        console.log(response.data);
        setError('');
        navigate('/write');
       }
       catch(error){
              setError(error.response.data.error);
       }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-mono text-center text-white">Sign In</h1>
                <input
                    type="text"
                    placeholder="Email"
                    className="w-72 h-10 rounded-xl pl-5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-72 h-10 rounded-xl pl-5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="bg-blue-400 py-3 w-72 rounded-xl text-black hover:bg-blue-300 transition duration-200"
                    onClick={signup}
                >
                    Sign In
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
        </div>
    );
}

export default Signin;
