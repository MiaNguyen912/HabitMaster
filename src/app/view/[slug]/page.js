'use client';
import Image from "next/image";
import MenuBar from "@/components/menu-bar";
import trophyImage from "@/../public/trophy.png";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';
import GoBackHeader from "@/components/goback-header";
import { BsTrash3Fill } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import React from "react";


// make GET request to /api/activity?id="..."
async function handleGetRequestWithID(id) {  
  try {
    const response = await axios.get('/../api/activity', {params: {id: id}});
    return response.data;
  } catch (error) {
      console.error('Error:', error.message);
  }
}
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


export default function View() {
  const pathname = usePathname()
  const [activity, setActivity] = useState();
  const slug_id = pathname.split("/")[2];
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
  });
  const [status, setStatus] = useState();
  const [originalData, setOriginalData] = useState(formData);

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

  async function handleUpdate(e) {
    e.preventDefault();

    // process data
    if (formData.hour === '') {
      formData.hour = 0;
    }
    if (formData.minute === '') {
      formData.minute = 0;
    }
    const adjustedFormData = {
      id: slug_id,
      name: formData.name,
      date: (new Date((formData.date).replace(/-/g, '/'))).toDateString(),
      recurring: daysOfWeek.filter(day => formData[`recurring${day}`]),
      duration: parseInt(formData.hour) * 60 + parseInt(formData.minute),
      category: formData.category,
      remind: formData.remind,
      status: status,
    };

    // make PUT request to /api/activity to update data
    try {
      const response = await axios.put('/../api/activity', adjustedFormData);
      console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
    alert("Your activity has been updated!");
    window.location.href = '/';
  
  }

  function handleCancel(e) {
    e.preventDefault();
    setFormData(originalData);
    window.location.href = '/';
  }

  async function handleDelete(e) {
    e.preventDefault();

    // make DELETE request to /api/activity to detele activity
    try {
      const response = await axios.delete('/../api/activity', {data: {id:slug_id}});
      console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
    alert("Your activity has been deleted!");
    window.location.href = '/';
  }

 

  useEffect(() => {
    async function fetchData() {
      const getResult = await handleGetRequestWithID(slug_id);
      const startDate = new Date(getResult["data"].date);
      const adjustedDate = startDate.toISOString().split('T')[0];
      setActivity(getResult["data"]); 

      const updatedFormData = {
        name: getResult["data"].name,
        date: adjustedDate,
        recurringSun: getResult["data"].recurring.includes('Sun'),
        recurringMon: getResult["data"].recurring.includes('Mon'),
        recurringTue: getResult["data"].recurring.includes('Tue'),
        recurringWed: getResult["data"].recurring.includes('Wed'),
        recurringThu: getResult["data"].recurring.includes('Thu'),
        recurringFri: getResult["data"].recurring.includes('Fri'),
        recurringSat: getResult["data"].recurring.includes('Sat'),
        hour: Math.floor(getResult["data"].duration / 60),
        minute: getResult["data"].duration % 60,
        category: getResult["data"].category,
        remind: getResult["data"].remind,
      };
      setStatus(getResult["data"].status);
      setFormData(updatedFormData);
      setOriginalData(updatedFormData);
    }
    fetchData();
    
  } ,[]);



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

        <div>
          <GoBackHeader text="Home"/>
          

          <div className="flex flex-col items-center justify-center gap-4 h-screen p-4 max-sm:p-0 ">
            <div className="relative flex flex-col items-center justify-center">
              <h1 className="font-bold text-3xl lg:text-3xl text-primary">{activity?.name}</h1>
            </div>


            {/* create activity form */}
            <form className="relative p-6 lg:mt-8 bg-white md:rounded-2xl rounded-2xl w-[90vw] min-w-[300px] max-w-[500px] h-[60vh] max-sm:h-[70vh] sm:min-h-[600px] flex flex-col justify-around gap-4 max-sm:gap-2 shadow-2xl">
             <button type='button' onClick={handleDelete} className="absolute top-4 right-4 text-accent"><BsTrash3Fill className="w-6 h-6"/></button>
             
             {/* name */}
              <div className="min-md:space-y-2 ">
                  <label htmlFor="name" className="block text-sm max-sm:text-xs text-gray-400">Activity Name</label>
                  <input type='text' placeholder='Task Name' required autoFocus
                      className="w-full border-b-2 border-0 max-sm:text-sm bg-white text-black m-2 max-sm:m-0 px-0 py-1 outline-none" 
                      name='name'
                      id='name'
                      value={formData.name}
                      onChange={handleInputChange}
                  />
              </div>
             
              {/* date */}
              <div className="min-md:space-y-2">
                  <label htmlFor="date" className="block text-sm max-sm:text-xs text-gray-400">Start Date</label>
                  <input type='date' required
                      className="w-full border-b-2 border-0 max-sm:text-sm  max-sm:m-0 bg-white text-black m-2 px-0 py-1 outline-none" 
                      name='date'
                      id='date'
                      value={formData.date}
                      onChange={handleInputChange}
                  />
              </div>

              {/* recurring */}
              <div className="min-md:space-y-2">
                <label htmlFor="recurring" className="block text-sm max-sm:text-xs text-gray-400">Recurring</label>
                <div className="flex justify-around items-center my-1 flex-wrap">
                  {daysOfWeek.map((day, index) => (
                    <label key={index} className="mr-2 flex flex-col items-center max-sm:text-xs">
                      <input type='checkbox'
                          className="w-4 h-4 accent-primary-dark " 
                          name={`recurring${day}`}
                          id={`recurring${day}`}
                          checked={formData[`recurring` + day]}
                          onChange={handleInputChange}
                      />
                      <span className="text-sm max-sm:text-xs text-gray-400">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* duration */}
              <div className="min-md:space-y-2">
                  <label htmlFor="duration" className="block text-sm max-sm:text-xs text-gray-400">Duration</label>
                  <div className="w-full border-b-2 border-0 m-2 max-sm:m-0 px-0 py-1">
                      <input
                        className="w-[35px] text-right max-sm:text-sm bg-white text-black outline-none"
                        type="number" 
                        name="hour" 
                        id="hour"
                        value={formData.hour}
                        onChange={handleInputChange}
                        placeholder="00" 
                        min="0" max="24"
                        
                      /> 
                      <span className="text-black max-sm:text-sm px-1">:</span>
                      <input
                        className="w-[35px] text-left bg-white max-sm:text-sm text-black outline-none"
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
              <div className="min-md:space-y-2">
                  <label htmlFor="category" className="block text-sm max-sm:text-xs text-gray-400">Category</label>
                  <select 
                    name='category' 
                    id='category' 
                    onChange={handleInputChange}  
                    value={formData.category} 
                    className="w-full p-2 my-1 border max-sm:text-xs border-gray-300 rounded-md"
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
                  <label htmlFor="remind" className="block text-md max-sm:text-sm text-primary-dark font-semibold"><FaRegBell className="inline-block"/> Remind Me</label>
                  <input type='checkbox'
                      className="w-4 h-4 accent-primary-dark" 
                      name='remind'
                      id='remind'
                      checked={formData.remind}
                      onChange={handleInputChange}
                  />
              </div>

              
              {/* create button */}
              <div className="mt-6 max-sm:mt-0 flex justify-center gap-4">
                 <button type='button' onClick={handleCancel} className="w-[50%] max-w-[250px] py-2 text-white bg-black rounded-lg text-lg max-sm:text-sm font-semibold hover:bg-accent">Cancel Change</button>
                 <button type='button' onClick={handleUpdate} className="w-[50%] max-w-[250px] py-2 text-white bg-primary rounded-lg text-lg max-sm:text-sm font-semibold hover:bg-accent">Update</button>
              </div>
            </form>
          </div>

        </div>


        {/* menu bar */}
    </div>
  );
}
