import React from 'react';
import { Swords } from 'lucide-react';
import { Link } from "react-router-dom";
function Header() {
    return (
        <>
            <div className='flex justify-between items-center text-white px-8 py-4 border-b border-gray-800'>
                <div className='flex items-center gap-3'>
                    <Swords size={24} />  {/* Adjust icon size if necessary */}
                    <h1 className='text-lg font-mono'>Spamurai</h1>    
                </div>

                <div className='flex items-center gap-6 text-black'>
                    <Link to="/signup">
                    <button className='bg-blue-400 px-4 py-2 rounded-lg font-mono text-sm hover:bg-blue-300 transition duration-200'>
                        Sign-Up
                    </button>
                    </Link>
                    <Link to="/signin">
                    <button className='bg-blue-400 px-4 py-2 rounded-lg font-mono text-sm hover:bg-blue-300 transition duration-200'>
                        Sign-In
                    </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Header;
