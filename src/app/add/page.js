'use client';
import { useState } from "react";
import GoBackHeader from "@/components/goback-header";
import { FaPlus } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import axios from "axios";
import React from "react";

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AddActivity() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    recurringSun: false,
    recurringMon: false,
    recurringTue: false,
    recurringWed: false,
    recurringThu: false,
    recurringFri: false,
    recurringSat: false,
    hour: '',
    minute: '',
    category: 'study',
    remind: false,
    gcal: false,
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

    // process data
    if (formData.hour === '') {
      formData.hour = 0;
    }
    if (formData.minute === '') {
      formData.minute = 0;
    }

    const user = localStorage.getItem("currentUser");
    const uid = user ? JSON.parse(user).uid : null;

    const adjustedFormData = {
      uid: uid,
      name: formData.name,
      date: new Date((formData.date)),
      recurring: daysOfWeek.filter(day => formData[`recurring${day}`]),
      duration: parseInt(formData.hour) * 60 + parseInt(formData.minute),
      category: formData.category,
      remind: formData.remind,
    };
    console.log(adjustedFormData);

    // make POST request to /api/activity
    try {
      const response = await axios.post('/../api/activity', adjustedFormData);
      console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }

    // make POST request to /api/calendar
      if(formData.gcal){
          try {
              const response = await axios.post('/../api/calendar', adjustedFormData);
              console.log('Success:', response.data);
          } catch (error) {
              console.error('Error:', error.message);
          }
      }
    alert("You've created a new task");
    window.location.href = '/home';
  }


  return (
    <div className="bg-light-blue relative isolate overflow-clip h-screen overflow-y-auto">
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
          <GoBackHeader text="Home"/>
          

          <div className="flex flex-col items-center md:justify-center justify-between h-screen p-4 max-sm:p-0 overflow-y-auto">
            <h1 className="font-bold text-3xl pt-[10vh] md:mb-4">Create New Task</h1>

            {/* create activity form */}
            <form onSubmit={handleSubmit} className="p-6 lg:mt-8 bg-white md:rounded-2xl rounded-t-2xl md:w-[70vw] w-full  min-w-[300px] flex flex-col justify-around gap-4 shadow-2xl">
              {/* name */}
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
             
              {/* date */}
              <div className="space-y-2">
                  <label htmlFor="date" className="block text-sm text-gray-400">Start Date</label>
                  <input type='date' required
                      className="w-full border-b-2 border-0 bg-white text-black m-2 px-0 py-1 outline-none" 
                      name='date'
                      id='date'
                      value={formData.date}
                      onChange={handleInputChange}
                  />
              </div>

              {/* recurring */}
              <div className="space-y-2">
                <label htmlFor="recurring" className="block text-sm text-gray-400">Recurring</label>
                <div className="flex justify-around items-center flex-wrap">
                  {daysOfWeek.map((day, index) => (
                    <label key={index} className="mr-2 flex flex-col items-center">
                      <input type='checkbox'
                          className="w-4 h-4 accent-primary-dark" 
                          name={`recurring${day}`}
                          id={`recurring${day}`}
                          checked={formData[`recurring` + day]}
                          onChange={handleInputChange}
                      />
                      <span className="text-sm text-gray-400">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* duration */}
              <div className="space-y-2">
                  <label htmlFor="duration" className="block text-sm text-gray-400">Duration</label>
                  <div className="w-full border-b-2 border-0 m-2 px-0 py-1">
                      <input
                        className="w-[35px] text-right bg-white text-black outline-none"
                        type="number" 
                        name="hour" 
                        id="hour"
                        value={formData.hour}
                        onChange={handleInputChange}
                        placeholder="00" 
                        min="0" max="24"
                        
                      /> 
                      <span className="text-black px-1">:</span>
                      <input
                        className="w-[35px] text-left bg-white text-black outline-none"
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

              {/* category */}
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
                      className="w-4 h-4 accent-primary-dark" 
                      name='remind'
                      id='remind'
                      checked={formData.remind}
                      onChange={handleInputChange}
                  />
              </div>

                {/* add to gcal button */}
                <div className="flex items-center justify-between">
                    <label htmlFor="remind" className="block text-md text-primary-dark font-semibold">Add to google calendar</label>
                    <input type='checkbox'
                           className="w-4 h-4 accent-primary-dark"
                           name='gcal'
                           id='gcal'
                           checked={formData.gcal}
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
