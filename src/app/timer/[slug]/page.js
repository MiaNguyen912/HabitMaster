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
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [recurring, setRecurring] = useState();
  const [category, setCategory] = useState();
  const [remind, setRemind] = useState();
  const [duration, setDuration] = useState(1); // set default at 1 minute so that the cup icon will not show up when the page is loading
  const [isCompleted, setIsCompleted] = useState(false);

  const [currentDuration, setCurrentDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quote, setQuote] = useState("");

  async function handleComplete() {
    const updatedActivity = {
      id: slug_id,
      name: name,
      date,
      recurring,
      duration,
      category,
      remind,
      status: 'completed'
    };
    const [quote, setQuote] = useState("");

    // make PUT request to /api/activity to update data's status to completed
    try {
      const response = await axios.put('/../api/activity', updatedActivity);
      console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
    alert(`You has completed ${name}`);
    window.location.href = '/home';
  
  }

  useEffect(() => { // fetch data 
    async function fetchData() {
      const getResult = await handleGetRequestWithID(slug_id);
      setDuration(getResult["data"].duration); 
      setOriginalDuration(getResult["data"].duration); // used to reset the timer
      setName(getResult["data"].name);
      setDate(getResult["data"].date);
      setRecurring(getResult["data"].recurring);
      setCategory(getResult["data"].category);
      setRemind(getResult["data"].remind);
      setIsCompleted(getResult["data"].status === 'completed');
    }
    fetchData();
    
  } ,[slug_id]);

  useEffect(() => { // Function to fetch a quote from ZenQuotes API
    const fetchQuote = async () => {
        try {
            const response = await axios.get("https://quoteslate.vercel.app/api/quotes/random");
            setQuote(response.data.quote); // Set the quote to state
        } catch (error) {
            console.error("Error fetching the quote:", error);
        }
    };
    fetchQuote(); // Fetch quote when the component mounts
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

        <div>
          <GoBackHeader text="Home"/>
          
          {!isCompleted && duration!=0 && (
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
                  onComplete={() => {
                    setIsCompleted(true);
                    handleComplete();
                    return { shouldRepeat: false};
                  }}
                >
                  {({ remainingTime }) => {
                      const hours = Math.floor(remainingTime / 3600);
                      const minutes = Math.floor(remainingTime / 60);
                      const seconds = remainingTime % 60;

                      return (
                        <>
                          {remainingTime>=10 &&
                            <div className="text-xl font-bold" role="timer" aria-live="assertive">{hours}:{minutes}:{seconds}</div>
                          }
                          {
                            remainingTime < 10 &&
                            <div className="text-2xl text-primary-dark font-bold" role="timer" aria-live="assertive">{seconds}</div>
                          }
                        </>
                      )
                    }}
                </CountdownCircleTimer>

                {/*Button to Control Timer*/}
                <div className="timer-controls">
                    <button className="timer-icon-button" onClick={() => setIsPlaying((prev) => !prev)}>
                        {isPlaying ? (
                            <CiPause1 className="timer-icon"/>
                        ) : (
                            <CiPlay1 className="timer-icon"/>
                        )}
                    </button>
                </div>

                {/* quote */}
                <p className="max-w-sm m-4 rounded-xl bg-secondary/50 py-4 px-6 text-center text-gray-700 italic mb-7">{`"${quote}"`}</p>

              </div>
          )}

          {(isCompleted || duration==0) && (
              <div className="flex flex-col items-center justify-center gap-4 h-screen p-4 max-sm:p-0 animate-grow">
                <Image src={trophyImage} alt="trophy" width={100} height={100} />
                <h1 className="text-4xl font-bold">Congratulations!</h1>
                <h2 className="text-xl font-bold">You has completed {name}</h2>
              </div>
          )}
        </div>
    </div>
  );
}
