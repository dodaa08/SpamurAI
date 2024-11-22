import React from 'react'
import Header from '../components/Header'
import land from './imgs/land.mp4'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
function Landing() {
    const [userexists, setUserexists] = React.useState(false);
    useEffect(()=>{
        const validate = async () => {
            try {
                const response = await axios.get('http://localhost:3000/validate');
                if(response.data.message === "User needs to sign up."){
                    setUserexists(true);
                }
                console.log(response.data);
            }
            catch (error) {
                console.error(error);
            }
        }
        validate();
    }, [])
    return (
       <>
         <div className='h-screen bg-black'>   
            <div>
                <Header />
            </div>

            <div className='flex justify-between text-white'>
                <div className='flex gap-10 py-10 px-20'>
                    <div className='flex flex-col py-20'>
                        <h1 className='text-3xl font-mono text-center'>Bored from traditional copy</h1>
                        <h1 className='text-3xl font-mono text-center'>Pasting the cold Emails ?</h1>
                        <h1 className='text-2xl font-mono text-center py-10 text-blue-500'>Introducing Spamurai</h1>
                        <h1 className='text-xl font-mono text-center'>The one Click AI Solution for sending Cold Emails</h1>
                        {
                            userexists && 
                            <Link to="write">
                        <button className='bg-blue-400 py-3  w-72 mt-5 ml-28 rounded-xl text-black hover:bg-blue-300 transition duration-200'>Write An Email</button>
                        </Link>
                        }
            </div>
                     <div className='flex'>
                     <video src={land} autoPlay loop muted className='h-96 rounded-xl ml-40 mt-10'></video>
                     </div>
                </div>
            </div>

         </div>
       </>   
    )
}

export default Landing
