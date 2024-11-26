'use client';
import Image from "next/image";
import trophyImage from "@/../public/trophy.png";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { usePathname } from 'next/navigation';
import GoBackHeader from "@/components/goback-header";
import React from "react";
import { CountdownCircleTimer, useCountdown } from 'react-countdown-circle-timer'
import { CiPause1, CiPlay1 } from "react-icons/ci";


// make GET request to /api/activity?id="..."
async function handleGetRequestWithID(id) {  
  try {
    const response = await axios.get('/../api/activity', {params: {id: id}});
    return response.data;
  } catch (error) {
      console.error('Error:', error.message);
  }
}



// main component
export default function Timer() {
  const slug_id = usePathname().split('/')[2];
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(0);
  const [originalDuration, setOriginalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  async function handleUpdate(e) { 
    e.preventDefault();
    const updatedActivity = {
      id: slug_id,
      status: 'completed'
    };

    // make PUT request to /api/activity to update data's status to completed
    try {
      const response = await axios.put('/../api/activity', updatedActivity);
      console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
    alert(`You has completed ${name}`);
    window.location.href = '/';
  
  }

  useEffect(() => {
    async function fetchData() {
      const getResult = await handleGetRequestWithID(slug_id);
      setDuration(getResult["data"].duration); 
      setOriginalDuration(getResult["data"].duration);
      setName(getResult["data"].name);
    }
    fetchData();
    
  } ,[slug_id]);



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
            <svg>
              <defs>
                <linearGradient id="linear-gradient" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="5%" stopColor="gold" />
                  <stop offset="95%" stopColor="red" />
                </linearGradient>
              </defs>
            </svg>
              
            <CountdownCircleTimer
              isPlaying={isPlaying}
              duration={duration*60}
              colors="url(#linear-gradient)"
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => ({ shouldRepeat: false})}
            >
              {({ remainingTime }) => {
                  const hours = Math.floor(remainingTime / 3600);
                  const minutes = Math.floor(remainingTime / 60);
                  const seconds = remainingTime % 60;
                
                  return (
                    <>
                      {remainingTime>10 &&
                        <div className="text-xl font-bold" role="timer" aria-live="assertive">{hours}:{minutes}:{seconds}</div>
                      }
                      {
                        remainingTime <= 10 &&
                        <div className="text-xl font-bold" role="timer" aria-live="assertive">0{hours}:0{minutes}:0{seconds}</div>
                      }
                    </>
                  )
                }}
            </CountdownCircleTimer>

            {/*Button to Control Timer*/}
              <div className="timer-controls">
                  <button
                      className="timer-icon-button"
                      onClick={() => setIsPlaying((prev) => !prev)}
                  >
                      {isPlaying ? (
                          <CiPause1 className="timer-icon"/>
                      ) : (
                          <CiPlay1 className="timer-icon"/>
                      )}
                  </button>
              </div>


          </div>
        </div>
    </div>
  );
}
