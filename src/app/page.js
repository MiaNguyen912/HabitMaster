'use client';
import Image from "next/image";
import ActivityWidget from "@/components/activity-widget";
import MenuBar from "@/components/menu-bar";
import trophyImage from "@/../public/trophy.png";
import DayWidget from "@/components/day-widget";
import { act, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { useEffect } from "react";
// import {activities} from "@/data/activities";


// make GET request to /api/activity?date="..."
async function handleGetRequestByDate(date) {  
  try {
    const response = await axios.get('/../api/activity', {params: {date: date}}); // date is a string, format: "2024/11/15"
    return response.data;
  } catch (error) {
      console.error('Error:', error.message);
  }
}

export default function Home() {
  const [mainDate, setMainDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(mainDate);
  const [rotateDirection, setRotateDirection] = useState(''); // New state to track rotation direction
  const [activities, setActivities] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); 


  useEffect(() => {
    async function fetchData() {
      const getResult = await handleGetRequestByDate(selectedDate.toDateString());
      setActivities(getResult["data"]); 
      console.log(getResult["data"]);     
    }
    fetchData();
  } , [selectedDate, refreshKey]);



  function handleGoBackDate() {
    const newDate = new Date();
    newDate.setDate(mainDate.getDate() - 5);
    setMainDate(newDate);
    setRotateDirection('rotate-forward'); 
  }
  
  function handleGoFowardDate() {
    const newDate = new Date();
    newDate.setDate(mainDate.getDate() + 5);
    setMainDate(newDate);
    setRotateDirection('rotate-backward');
  }

  async function handleDelete(e, activityName, id) {
      e.preventDefault();

      // make DELETE request to /api/activity to detele activity
      try {
      const response = await axios.delete('/../api/activity', {data: {id:id}});
      console.log('Success:', response.data);
      } catch (error) {
          console.error('Error:', error.message);
      }
      alert(`${activityName} has been deleted!`);
      setRefreshKey((prevKey) => prevKey+1); // refresh the page
  }

  function getNumCompleted(activities) {
    return activities.filter(activity => activity.status === "completed").length;
  }

  function getFiveRecentDates(selectedDate){
      const recentDates = [];
      for (let i = 7; i >=1; i--) {
          const recentdate = new Date();
          recentdate.setDate(selectedDate.getDate() - i);
          recentDates.push(recentdate);
      }
      for (let i = 0; i <= 7; i++) {
        const recentdate = new Date();
        recentdate.setDate(selectedDate.getDate() + i);
        recentDates.push(recentdate);
    }

      return recentDates;
  }

  function isToday(date) {
      if (date.toDateString() == new Date().toDateString()) {
          return true;
      }
  }

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

        <div className="flex flex-col md:flex-row items-center justify-center p-6 pb-36 md:gap-36 gap-8 min-h-screen relative">
          


          
          <div>
            {/* Welcome box */}
            <div className="flex items-center pb-6">
                <div className="bg-unicorn-purple-purple bg-opacity-20 backdrop-blur-md px-6 py-8 rounded-xl shadow-lg w-full flex items-center justify-between">
                    <div className="mr-6">
                        <h1 className="text-lg font-semibold text-secondary mb-4">Welcome back!</h1>
                        <p className="text-gray-300">Completed {getNumCompleted(activities)}/{activities.length} task {isToday(selectedDate)? 'today' : 'for ' + selectedDate.getMonth() + '/' + selectedDate.getDate()}</p>
                        
                        {/* Progress bar */}
                        <div>
                          <div className="mt-6">
                            <div className=" rounded-full bg-gray-400">
                              {activities.length > 0 && (
                                <div style={{ width: `${(getNumCompleted(activities)/activities.length) * 100}%` }} className="h-2 relative rounded-full bg-gradient-to-t from-pink-500 to-accent">
                                    <div className="rounded-full w-5 h-5 bg-primary border-4 border-secondary absolute right-0 translate-x-1/2 -translate-y-1/3"></div>
                                </div>
                              )}
                              {activities.length == 0 &&
                                 <div style={{ width: 0 }} className="h-2 relative rounded-full bg-gradient-to-t from-pink-500 to-accent">
                                    <div className="rounded-full w-5 h-5 bg-primary border-4 border-secondary absolute right-0 translate-x-1/2 -translate-y-1/3"></div>
                                 </div>
                              }
                              
                            
                            </div>
                          </div>
                        </div>
                    </div>
                  
                  <Image src={trophyImage} width={70} height={70} alt="trophy image" className="mr-2" />

                </div>
            </div>


            {/* day widgets */}
            <div className="flex md:gap-3 gap-2 mb-6">
              <button onClick={handleGoBackDate}><IoIosArrowBack className="text-primary-dark"/></button>
              <div className="overflow-hidden  max-w-[300px] py-2">
                  <div className={`flex justify-center md:gap-3 gap-2 transition duration-1000 ease ease-in-out ${rotateDirection}`} onAnimationEnd={()=>setRotateDirection("")}>
                    {
                      getFiveRecentDates(mainDate).map(date => (
                        <button onClick={()=>{setSelectedDate(date)}} key={date.toDateString()}>
                            <DayWidget  date={date} mainDate={mainDate} selectedDate={selectedDate} />
                        </button>
                        
                      ))
                    }
                  </div>
              </div>
              
              <button onClick={handleGoFowardDate}><IoIosArrowForward className="text-primary-dark"/></button>
            </div>

            
            {/* Activity widgets */}
            <div className="flex flex-col justify-center lg:gap-4 gap-3 items-center ">
            {activities.map(activity => (
                <ActivityWidget key={activity.id} {...activity } selectedDate={selectedDate} deleteFunction={handleDelete}/>
            ))}
            {activities.length == 0 && (
              <p className="text-gray-400">You dont have any task for today</p>
            )}
          </div>
          </div>
         
        </div>
        

        {/* menu bar */}
        <MenuBar activeButton={"home"}/>
    </div>
  );
}
