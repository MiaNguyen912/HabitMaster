'use client';
import React from 'react'
import GoBackHeader from "@/components/goback-header";
import { IoIosSend } from "react-icons/io";


const ChatBox = () => {
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
                    <p style={styles.chatMessage}>Welcome to the AI assistant chat!</p>
                </div>

                {/* Input field */}
                <div style={styles.inputContainer}>
                    <textarea style={styles.inputField} placeholder="Chat with AI assistant"></textarea>
                    <button className='m-2 mr-4 text-primary text-3xl p-1 hover:text-accent rounded-full bg-slate-200'><IoIosSend /></button>
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
  chatMessage: {
    margin: '0',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: '#e0e0e0',
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
  },
 
};

export default ChatBox;
