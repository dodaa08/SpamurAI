import React from 'react';
import axios from 'axios';

function Writer() {
    const [prompt, setPrompt] = React.useState('');
    const [content, setContent] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [subject, setSubject] = React.useState('');

    const generateContent = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/write', { type: prompt });
            setContent(response.data.messages);
            console.log(response.data.messages);
        }
        catch (error) {
            console.error(error);
        }
    };

    const sendEmail = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/email', {
                subject: subject,
                content: content,
                email: email
            }, {
                headers: { Authorization: `Bearer ${token}` }
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
                            <p className="text-center text-white font-mono text-xl">What kind of drafts are you looking for?</p>
                        </div>
                    ) : (
                        <div className="flex-grow flex justify-center items-center">
                            <div className='bg-gray-500 py-10 px-10 w-max h-max'>
                                <p className="text-center text-white font-mono text-xl">{content}</p>
                            </div>
                            <div className='mt-5 flex flex-col space-y-5'>
                                <input
                                    type="text"
                                    placeholder='Receiver Email'
                                    className='rounded-l py-5 px-10 font-mono'
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                                <button onClick={sendEmail} className='bg-green-400 py-2 px-5 rounded-l font-mono'>Send</button>
                            </div>
                        </div>
                    )
                }

                {/* Footer */}
                <footer className="flex justify-center items-center gap-1 p-5">
                    <input
                        type="text"
                        placeholder="Prompt Details"
                        className="rounded-l py-3 px-40 font-mono"
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
