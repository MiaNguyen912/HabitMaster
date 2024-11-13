'use client';
import Image from "next/image";
import ActivityWidget from "@/components/activity-widget";
import MenuBar from "@/components/menu-bar";
import trophyImage from "@/../public/trophy.png";
import DayWidget from "@/components/day-widget";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const activities = [
    {
        id: 1,
        name: "Read book",
        status: "completed",
        date: "2024/11/12",
        duration: 30,
        category: "study"
    },
    {
        id: 2,
        name: "Read book",
        status: "completed",
        date: "2024/11/12",
        duration: 30,
        category: "study"
    },
    {
      id: 3,
      name: "Read book",
      status: "completed",
      date: "2024/11/12",
      duration: 30,
      category: "study"
  },
    {
        id: 4,
        name: "Meditate",
        status: "incompleted",
        date: "2024/11/12",
        duration: 15,
        category: "personal"
    },
    {
      id: 5,
      name: "Run",
      status: "incompleted",
      date: "2024/11/11",
      duration: 10,
      category: "health"
  }
]





export default function Home() {
  const [mainDate, setMainDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(mainDate);


  function handleGoBackDate() {
    const newDate = new Date();
    newDate.setDate(mainDate.getDate() - 5);
    setMainDate(newDate);
    console.log(newDate);
  }
  
  function handleGoFowardDate() {
    const newDate = new Date();
    newDate.setDate(mainDate.getDate() + 5);
    setMainDate(newDate);
    console.log(newDate);
  }

  function getActivitiesByDate(date) {
    return activities.filter(activity => {
      return new Date(activity.date).getDate() == date.getDate();
    });
  }

  function getNumCompleted(activities) {
    return activities.filter(activity => activity.status === "completed").length;
}

  function getFiveRecentDates(selectedDate){
      const recentDates = [];
      for (let i = 2; i >=1; i--) {
          const recentdate = new Date();
          recentdate.setDate(selectedDate.getDate() - i);
          recentDates.push(recentdate);
      }
      for (let i = 0; i <= 2; i++) {
        const recentdate = new Date();
        recentdate.setDate(selectedDate.getDate() + i);
        recentDates.push(recentdate);
    }

      return recentDates;
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
                        <p className="text-gray-300">Completed {getNumCompleted(getActivitiesByDate(selectedDate))}/{getActivitiesByDate(selectedDate).length} task today</p>
                        
                        {/* Progress bar */}
                        <div>
                          <div className="mt-6">
                            <div className=" rounded-full bg-gray-400">
                              <div style={{ width: `${(getNumCompleted(getActivitiesByDate(selectedDate))/getActivitiesByDate(selectedDate).length) * 100}%` }} className="h-2 relative rounded-full bg-gradient-to-t from-pink-500 to-accent">
                                  <div className="rounded-full w-5 h-5 bg-primary border-4 border-secondary absolute right-0 translate-x-1/2 -translate-y-1/3">
                              </div>
                            </div>
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
              {
                getFiveRecentDates(mainDate).map(date => (
                  <button onClick={()=>{setSelectedDate(date); setMainDate(date)}}>
                      <DayWidget key={date.toDateString()} date={date} mainDate={mainDate} />
                  </button>
                  
                ))
              }
              <button onClick={handleGoFowardDate}><IoIosArrowForward className="text-primary-dark"/></button>
            </div>

            
            {/* Activity widgets */}
            <div className="flex flex-col justify-center lg:gap-4 gap-3 items-center ">
            {getActivitiesByDate(selectedDate).map(activity => (
                <ActivityWidget key={activity.id} {...activity }/>
            ))}
          </div>
          </div>
         
        </div>
        

        {/* menu bar */}
        <MenuBar activeButton={"home"}/>
    </div>
  );
}
