'use client';
import '../styles/login.css';
import axios from "axios";
import {useEffect, useState} from "react";
import Link from 'next/link';

export default function Login() {
    const [quote, setQuote] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Function to fetch a quote from ZenQuotes API
        const fetchQuote = async () => {
            try {
                const response = await axios.get("https://quoteslate.vercel.app/api/quotes/random");
                console.log(response);
                setQuote(response.data.quote);  // Set the quote to state
            } catch (error) {
                console.error("Error fetching the quote:", error);
            }
        };

        fetchQuote();  // Fetch quote when the component mounts
    }, []);

    return (
        <div className="bg-light-blue relative isolate overflow-clip">
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

            {/* main content */}
            <main className="flex flex-col justify-center items-center min-h-screen">
                <h2 className="mb-1 text-3xl font-light text-center text-gray-900">
                    Welcome Back To...
                </h2>
                <h1 className="mb-7 text-5xl font-bold text-center text-gray-900">
                    HabitMaster
                </h1>
                <p className="m-3 quote text-center text-gray-700 italic mb-7">{`"${quote}"`}</p>
                <div className="flex flex-col" data-id="login-card">
                    <p className="text-gray-950">Email</p>
                    <input
                        type="text"
                        className="mb-1 border border-gray-300 rounded-md px-4 py-2 bg-blue-950 text-white"
                        placeholder="Enter email"
                    />
                    <p className="text-gray-950">Password</p>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md px-4 py-2 bg-blue-950 text-white mb-3"
                        placeholder="Enter password"
                    />
                    <button
                        className="border border-gray-300 rounded-md px-4 py-2 bg-red-600 text-white font-bold">Login
                    </button>
                    <Link onClick={() => handleButtonClick('register')} href="/register"
                          className="mt-2 italic text-gray-500 hover:text-gray-900">Don’t have an account? Sign
                        Up</Link>
                </div>
            </main>
        </div>
    );
}
