'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/data/firebaseConfig";

export default function Login() {
    const [quote, setQuote] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Dynamically update the field based on the input's "name"
        }));
    };

    useEffect(() => {
        // Function to fetch a quote from ZenQuotes API
        const fetchQuote = async () => {
            try {
                const response = await axios.get("https://quoteslate.vercel.app/api/quotes/random");
                console.log(response);
                setQuote(response.data.quote); // Set the quote to state
            } catch (error) {
                console.error("Error fetching the quote:", error);
            }
        };

        fetchQuote(); // Fetch quote when the component mounts
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Sign in the user with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            const uid = user.uid; // Get the user's UID

            console.log("User logged in:", user);

            // Make a GET request to /api/users with UID as a query parameter
            const response = await axios.get(`/api/users?uid=${uid}`);
            console.log("User data retrieved successfully:", response.data);

            // Store user info in localStorage
            const userData = {
                uid: uid,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: formData.email,
            };
            localStorage.setItem("currentUser", JSON.stringify(userData));


            // Redirect to the home page after successful login and user data retrieval
            window.location.href = "/home";
        } catch (error) {
            console.error("Error during login or data retrieval:", error.message);
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="bg-light-blue relative isolate overflow-clip">
            {/* Parallax background decor */}
            <div className="fixed -z-10">
                <div
                    aria-hidden="true"
                    className="absolute top-[-30rem] left-[25vw] blur-3xl transform-gpu"
                >
                    <div
                        style={{
                            clipPath: "polygon(50% 0%, 65% 8%, 78% 5%, 88% 18%, 98% 35%, 90% 50%, 85% 65%, 70% 75%, 55% 88%, 40% 75%, 28% 85%, 15% 70%, 5% 52%, 12% 35%, 20% 22%, 35% 15%, 45% 5%)"
                        }}
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-80"
                    />
                </div>
                <div
                    aria-hidden="true"
                    className="absolute top-[10rem] left-[10vw] blur-3xl transform-gpu"
                >
                    <div
                        style={{
                            clipPath: "polygon(8% 82%, 73% 32%, 43% 91%, 15% 55%)"
                        }}
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-80"
                    />
                </div>
            </div>

            {/* Main content */}
            <main className="flex flex-col justify-center items-center min-h-screen">
                <h2 className="mb-1 text-3xl font-light text-center text-gray-900">
                    Welcome Back To...
                </h2>
                <h1 className="mb-7 text-5xl font-bold text-center text-gray-900">
                    HabitMaster
                </h1>
                <p className="m-3 quote text-center text-gray-700 italic mb-7">{`"${quote}"`}</p>
                <div data-id="login-card">
                    <form onSubmit={handleLogin} className="flex flex-col">
                        <p className="text-gray-950">Email</p>
                        <input
                            type="email"
                            name="email"
                            className="mb-1 border border-gray-300 rounded-md px-4 py-2 bg-blue-950 text-white"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <p className="text-gray-950">Password</p>
                        <input
                            type="password"
                            name="password"
                            className="border border-gray-300 rounded-md px-4 py-2 bg-blue-950 text-white mb-3"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="border border-gray-300 rounded-md px-4 py-2 bg-red-600 text-white font-bold"
                        >
                            Login
                        </button>
                    </form>
                    <Link
                        href="/register"
                        className="mt-2 italic text-gray-500 hover:text-gray-900"
                    >
                        Don’t have an account? Sign Up
                    </Link>
                </div>
            </main>
        </div>
    );
}
