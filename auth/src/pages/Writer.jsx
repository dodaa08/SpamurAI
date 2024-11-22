import React from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';
function Writer() {
    const [prompt, setPrompt] = React.useState('');
    const [content, setContent] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    const generateContent = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        try { const response = await axios.post('http://10.12.27.244:3000/write', { type: prompt }); setContent(response.data.messages); console.log(response.data.messages); } catch (error) { if (error.response) { console.error("Error response:", error.response.data); } else if (error.request) { console.error("Error request:", error.request); } else { console.error("Error message:", error.message); } }
    };

    const sendEmail = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/email', {
                content: content,
                email: email
            });

            console.log(response.data.messages);
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="bg-black h-screen flex flex-col justify-between">
                {/* Header */}
                <div className="flex text-white">
                    <h1 className="text-2xl font-mono py-5 px-10">SpamurAI</h1>
                </div>

                {
                    !content ? (
                        <div className='flex-grow flex justify-center items-center'>
                            
                            <p className="text-center text-white font-mono text-xl">What kind of drafts are you looking for ?  </p>
                        {loading && (
                            <>
                            <Loader  className='h-20'/>
                            </>
                        )}
                        </div>
                        
                    ) : (
                        <>
                        
                        <div className=" flex justify-center items-center">
                            <div className=' py-10 px-10 w-max h-max'>
                                <p className="text-center text-white font-mono text-xl">{content}</p>
                            </div>
                            
                        </div>
                        <div className='flex justify-center gap-1'>
                                <input
                                    type="text"
                                    placeholder='Receiver Email'
                                    className='rounded-l py-3 px-10 font-mono rounded-r'
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                                <button onClick={sendEmail} className='bg-green-400 py-2 text-l px-5 rounded-l hover:bg-green-200 transition duration-200 font-mono'>Send</button>
                            </div>
                                    </>
                    )
                }

                {/* Footer */}
                <footer className="flex justify-center items-center gap-1 p-5">
                    <input
                        type="text"
                        placeholder="Prompt Details"
                        className="rounded-l py-3 px-2 w-96 font-mono"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button onClick={generateContent} className="bg-blue-500 py-3 px-3 rounded hover:bg-blue-400 transition duration-200">
                        Generate
                    </button>
                </footer>
            </div>
        </>
    );
}

export default Writer;
