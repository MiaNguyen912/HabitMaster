'use client';
import { useState } from "react";
import GoBackHeader from "@/components/goback-header";
import { FaPlus } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import axios from "axios";
import React from "react";


export default function AddActivity() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    hour: '',
    minute: '',
    category: '',
    remind: false,
  });

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target; // Destructure input event
    if (type === 'checkbox') {
      setFormData({
        ...formData, 
        [name]: checked, 
      });
    } else {
      setFormData({
        ...formData, // Spread the existing state
        [name]: value, // Update the value of the specific field
      });
    }
    
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);

    // make POST request to /api/create
    try {
      const response = await axios.post('/../api/create', formData);
      console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
    alert("You've created a new task");

    // clear the form
    setFormData({
      name: '',
      date: '',
      hour: '',
      minute: '',
      category: '',
      remind: false,
    });
    
    window.location.href = '/';
  
  }


  return (
    <div className="bg-light-blue relative isolate overflow-clip min-h-screen">
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
        <div>
          <GoBackHeader/>
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="font-bold text-3xl mb-8">Create New Task</h1>

            {/* create activity form */}
            <form onSubmit={handleSubmit} className="p-6 mt-8 bg-white rounded-2xl w-[50vw] flex flex-col gap-4">
              <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm text-gray-400">Activity Name</label>
                  <input type='text' placeholder='Task Name' required autoFocus
                      className="w-full border-b-2 border-0 bg-white text-black  m-2 px-0 py-1 outline-none" 
                      name='name'
                      id='name'
                      value={formData.name}
                      onChange={handleInputChange}
                  />
              </div>
             
              <div className="space-y-2">
                  <label htmlFor="date" className="block text-sm text-gray-400">Date</label>
                  <input type='date' required
                      className="w-full border-b-2 border-0 bg-white text-black m-2 px-0 py-1 outline-none" 
                      name='date'
                      id='date'
                      value={formData.date}
                      onChange={handleInputChange}
                  />
              </div>

              <div className="space-y-2">
                  <label htmlFor="duration" className="block text-sm text-gray-400">Duration</label>
                  <div className="w-full border-b-2 border-0 m-2 px-0 py-1">
                      <input
                        className="w-[20px] text-right bg-white text-black outline-none"
                        type="number" 
                        name="hour" 
                        id="hour"
                        value={formData.hour}
                        onChange={handleInputChange}
                        placeholder="00" 
                        min="0" max="24"
                        
                      /> 
                      <span className="text-black">:</span>
                      <input
                        className="w-[20px] text-left bg-white text-black outline-none"
                        type="number" 
                        name="minute" 
                        id="minute"
                        value={formData.minute}
                        onChange={handleInputChange}
                        placeholder="00" 
                        min="0" max="60"
                      /> 
                  </div>
              </div>

              <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm text-gray-400">Category</label>
                  <select 
                    name='category' 
                    id='category' 
                    onChange={handleInputChange}  
                    value={formData.category} 
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="study">Study</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                  </select>
              </div>

             {/* remind me button */}
              <div className="flex items-center justify-between">
                  <label htmlFor="remind" className="block text-md text-primary-dark font-semibold"><FaRegBell className="inline-block"/> Remind Me</label>
                  <input type='checkbox'
                      className="w-4 h-4" 
                      name='remind'
                      id='remind'
                      checked={formData.remind}
                      onChange={handleInputChange}
                  />
              </div>

              
              {/* create button */}
              <div className="mt-6">
                <button type="submit" className="w-full py-2 text-white bg-primary-dark rounded-xl font-semibold"><span className="bg-secondary/10 rounded-full px-1 mr-1"><FaPlus size={10} className="inline-block text-secondary -translate-y-[1px]"/></span> Create Task</button>
              </div>
            </form>
          </div>

        </div>



    </div>
  );
}
