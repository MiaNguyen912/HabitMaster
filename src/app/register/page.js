'use client';
import axios from "axios";
import {useEffect, useState} from "react";
import Link from 'next/link';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/data/firebaseConfig";

export default function Register() {
  const [quote, setQuote] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the field based on the input's "name"
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      const uid = user.uid;

      // Store user info in localStorage
      const userData = {
        uid: uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));

      // Save user data to Firestore
      const response = await axios.post('../api/users', userData);
      console.log('Success:', response.data);

      // Redirect to home page
      window.location.href = '/home';
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert(error.message);
    }
  };

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

    fetchQuote();  // Fetch quote when component mounts
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
            Welcome To...
          </h2>
          <h1 className="mb-7 text-5xl font-bold text-center text-gray-900">
            HabitMaster
          </h1>
          <p className="m-3 quote text-center text-gray-700 italic mb-7">{`"${quote}"`}</p>
          <div data-id="register-card">
            <form onSubmit={handleRegister} className="flex flex-col">
              <p className="text-gray-950">First Name</p>
              <input
                  type="text"
                  name="firstName"
                  className="mb-1 border border-gray-300 rounded-md px-4 py-2 bg-blue-950 text-white"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
              />
              <p className="text-gray-950">Last Name</p>
              <input
                  type="text"
                  name="lastName"
                  className="mb-1 border border-gray-300 rounded-md px-4 py-2 bg-blue-950 text-white"
                  placeholder="Enter last Name"
                  value={formData.lastName}
                  onChange={handleChange}
              />
              <p className="text-gray-950">Email</p>
              <input
                  name="email"
                  type="email"
                  className="mb-1 border border-gray-300 rounded-md px-4 py-2 bg-blue-950 text-white"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
              />
              <p className="text-gray-950">Password</p>
              <input
                  name="password"
                  type="password"
                  className="mb-3 border border-gray-300 rounded-md px-4 py-2 bg-blue-950 text-white"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
              />
              <button type="submit"
                      className="border border-gray-300 rounded-md px-4 py-2 bg-red-600 text-white font-bold">Sign Up
              </button>
            </form>
            <Link onClick={() => handleButtonClick('login')} href="/"
                  className="mt-2 italic text-gray-500 hover:text-gray-900">Already have an account? Log in</Link>
          </div>
        </main>
      </div>
  );
}
