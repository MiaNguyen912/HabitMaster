'use client';
import Image from "next/image";
import ActivityWidget from "@/components/activity-widget";
import MenuBar from "@/components/menu-bar";
import trophyImage from "@/../public/trophy.png";

const activities = [
    {
        id: 1,
        name: "Read 10 pages of book",
        status: "completed",
        date: "2022-01-01",
        duration: 30,
        category: "study"
    },
    {
        id: 2,
        name: "Meditate",
        status: "incompleted",
        date: "2022-01-01",
        duration: 15,
        category: "personal"
    },
    {
      id: 2,
      name: "Run",
      status: "incompleted",
      date: "2022-01-01",
      duration: 10,
      category: "health"
  }
]

function getNumCompleted(activities) {
    return activities.filter(activity => activity.status === "completed").length;
}

export default function Home() {
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
        <main className="flex flex-col justify-center gap-8 items-center min-h-screen">
          This is the Home page
          
          {/* Welcome box */}
          <div>
              <div className="bg-unicorn-purple-purple bg-opacity-20 backdrop-blur-md px-6 py-8 rounded-2xl shadow-lg w-[350px] flex items-center justify-between">
                  <div className="mr-6">
                      <h1 className="text-lg font-semibold text-secondary mb-4">Welcome back!</h1>
                      <p className="text-gray-300">Completed {getNumCompleted(activities)}/{activities.length} task today</p>
                      
                      {/* Progress bar */}
                      <div>
                        <div className="mt-6">
                          <div className=" rounded-full bg-gray-400">
                            <div style={{ width: `${(getNumCompleted(activities)/activities.length) * 100}%` }} className="h-2 relative rounded-full bg-gradient-to-t from-pink-500 to-accent">
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
          

          {/* Activity widgets */}
          {activities.map(activity => (
              <ActivityWidget key={activity.id} {...activity }/>
          ))}

        </main>

        {/* menu bar */}
        <MenuBar activeButton={"home"}/>
    </div>
  );
}
