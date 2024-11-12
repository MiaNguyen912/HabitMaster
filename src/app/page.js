'use client';

import ActivityWidget from "@/components/activity-widget";
import MenuBar from "@/components/menu-bar";

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
    }
]


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
          
          {activities.map(activity => (
              <ActivityWidget key={activity.id} {...activity }/>
            ))
          }
          {/* <ActivityWidget id="1" name="Activity 1" status="completed" date="2022-01-01" duration="60" category="work"/>
          <ActivityWidget id="2" name="Activity 2" status="incompleted" date="2022-01-01" duration="15" category="personal"/> */}

        </main>

        {/* menu bar */}
        <MenuBar activeButton={"home"}/>
    </div>
  );
}
