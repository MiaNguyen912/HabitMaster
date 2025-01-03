'use client';
import React, { useState } from 'react';
import GoBackHeader from "@/components/goback-header";
import { IoIosSend } from "react-icons/io";
import axios from 'axios';

const ChatBox = () => {
    const [messageHistory, setMessageHistory] = useState([]);
    const [inputValue, setInputValue] = useState('');

    async function fetchAIResponse(userMessage) {
        try {
            const response = await axios.post('/../api/openai', {userMessage: userMessage});
            // console.log('Success:', response.data);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching OpenAI response:", error);
        }
    }

    // Function to handle AI responses
    const AskTheAI = async (userMessage) => {
        const aiResponse = await fetchAIResponse(userMessage); // Fetch AI response

        setMessageHistory((prev) => [...prev, { type: 'user', text: userMessage }]); // Update user message
        if (aiResponse){
            setMessageHistory((prev) => [...prev, { type: 'ai', text: aiResponse }]); // Update AI message
        } else {
            setMessageHistory((prev) => [...prev, { type: 'ai', text: 'ERROR fetching the AI response.' }]); 
        }
    };

    // Function to handle Send button click
    const handleSend = () => {
        if (inputValue.trim() === '') return; // Ignore empty input
        AskTheAI(inputValue);
        setInputValue(''); // Clear input field
    };






    return (
        <div className="bg-light-blue relative h-screen isolate overflow-clip">
            {/* paralax background decor*/}
            <div className="fixed -z-10">
                <div aria-hidden="true" className="absolute top-[-30rem] left-[25vw] blur-3xl transform-gpu">
                    <div
                        style={{clipPath: 'polygon(50% 0%, 65% 8%, 78% 5%, 88% 18%, 98% 35%, 90% 50%, 85% 65%, 70% 75%, 55% 88%, 40% 75%, 28% 85%, 15% 70%, 5% 52%, 12% 35%, 20% 22%, 35% 15%, 45% 5%)'}}
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-80"
                    />
                </div>
                <div aria-hidden="true" className="absolute top-[10rem] left-[10vw] blur-3xl transform-gpu">
                    <div
                        style={{clipPath: 'polygon(8% 82%, 73% 32%, 43% 91%, 15% 55%)',}}
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-80"
                    />
                </div>
            </div>

            {/* header */}
            <GoBackHeader text="Home"/>

            {/* chat box */}
            <div className='flex flex-col justify-center items-center h-screen'>
                <div  style={styles.container} className='flex flex-col justify-center items-center h-screen w-screen max-w-[600px] max-sm:rounded-none rounded-md max-sm:pt-[40px] sm:h-[80vh] sm:w-[90%] '>
                    {/* Chat history content */}
                    <div style={styles.chatHistory}>
                        <p style={styles.aiMessage}>Welcome to the AI assistant chat!</p>
                        {messageHistory.map((message, index) => (
                            <p key={index} style={message.type === 'user'? styles.userMessage: styles.aiMessage}>
                                {message.text}
                            </p>
                        ))}
                    </div>

                    {/* Input field */}
                    <div style={styles.inputContainer}>
                        <textarea style={styles.inputField} placeholder="Chat with AI assistant" value={inputValue} onChange={(e) => setInputValue(e.target.value)}></textarea>
                        <button onClick={handleSend} className='m-2 mr-4 text-primary text-3xl p-1 hover:text-accent rounded-full bg-slate-200'><IoIosSend /></button>
                    </div>
                </div>
            </div>
        
        </div>
    
    );
};

const styles = {
  container: {
    margin: '0 auto',
    border: '1px solid #ccc',
    // borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  chatHistory: {
    flex: 1,
    width: '100%',
    overflowY: 'auto',
    padding: '16px',
    borderBottom: '1px solid #ccc',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '8px',
    marginBottom: '8px',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#212121',
    padding: '8px 12px',
    borderRadius: '8px',
    marginBottom: '8px',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderTop: '1px solid #ccc',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
  },
  inputField: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    border: 'none',
    outline: 'none',
    resize: 'none',
    boxSizing: 'border-box',
    color: '#000000'
  },
 
};

export default ChatBox;
