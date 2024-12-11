'use client';

import MenuBar from "@/components/menu-bar";
import {useState} from "react";

export default function CalendarPage() {
    const [date, setDate] = useState(new Date()); // State to hold the selected date

    const handleDateChange = (newDate) => {
        setDate(newDate); // Update the selected date when a user clicks a date
        console.log("Selected Date:", newDate);
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
        <main className="flex flex-col justify-center gap-8 items-center min-h-screen">
            <div className="google-calendar-container mt-8 w-full flex justify-center">
                {/* Google Calendar Embed */}
                <iframe
                    src="https://calendar.google.com/calendar/embed?src=c_305bec7cb7730d43d3f88bb9afe4b8c139cc3154c08f41c3be46b66e77331bb0%40group.calendar.google.com&ctz=America%2FLos_Angeles"
                    className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 h-80 sm:h-96 md:h-[60vh] lg:h-[70vh] xl:h-[60vh]"
                    title="Google Calendar"
                ></iframe>
            </div>
        </main>

        {/* menu bar */}
        <MenuBar activeButton={"calendar"}/>
    </div>
  );
}
