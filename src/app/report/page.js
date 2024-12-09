'use client';
import {useEffect, useState } from 'react';
import axios from 'axios';
import MenuBar from "@/components/menu-bar";
import ReportChart from "@/components/chart";
import GoBackHeader from "@/components/goback-header";
import ActivityReportWidget from "@/components/activity-report-widget";
import WeekDropdown from "@/components/week-dropdownlist";

const weekSelections = ["This week", "Last week", "2 weeks ago", "3 weeks ago", "4 weeks ago"];



export default function Report() {
    const [selectedWeek, setSelectedWeek] = useState("This week");
    const [activitiesByDay, setActivitiesByDay] = useState([[], [], [], [], [], [], []]);
    const [summarizedActivities, setSummarizedActivities] = useState({});
    /* example summarizedActivities
        {"FUu8GYXd9jhTk9ow7Jw3": {name: "Study", duration: 30, unit: "minute", category: "study", completionCount: 3, totalCount: 5},
         "ABc8GYXd9jhTk9ow7Jw3": {duration: 30, unit: "minute", category: "exercise", completionCount: 3, totalCount: 5},
        }
    */

    function findCurrentWeekDates() {
        const weekDays = [];
        const weekOffset = weekSelections.indexOf(selectedWeek);
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        
        for (let i = 0; i <= 6; i++) { // Set the first day to Monday and loop through 7 days
            const day = new Date(today); // Create a new date for each day
            day.setDate(today.getDate() + diffToMonday + i - weekOffset*7); // Calculate each day's date
            weekDays.push(day.toDateString()); // Convert to a readable format or keep as a Date object
        }
        return weekDays;
    } 
   
    useEffect(() => {
        const weekDays = findCurrentWeekDates();
        async function fetchData() {
          try {
            // Fetch activities for all days in parallel
            const user = localStorage.getItem("currentUser");
            const uid = user ? JSON.parse(user).uid : null;
            const responses = await Promise.all(
                weekDays.map(date =>axios.get('/../api/activity', { params: { uid: uid, date: date } }))
            );

            // Extract activity data and default to an empty array if no data exists
            const allActivities = responses.map(res =>res.data?.data ?? []);
            setActivitiesByDay(allActivities);
          } catch (error) {
            console.error('Error fetching activities:', error.message);
            setActivitiesByDay([[], [], [], [], [], [], []]); // Set all days to empty activities if there's an error
          }
        }
       
        fetchData();
    }, [selectedWeek]);  

    useEffect(() => {
        function summarizeActivities() {
            const newSummarizedActivities = {};
            activitiesByDay.forEach(activities => {
                activities.forEach(activity => {
                    const id = activity.id;
                    const status = activity.status;
        
                    if (newSummarizedActivities[id]) {
                        newSummarizedActivities[id].completionCount += status === "completed" ? 1 : 0;
                        newSummarizedActivities[id].totalCount += 1;
                    } else {
                        const name = activity.name;
                        const duration = activity.duration;
                        const unit = "minute"; // Assume all activities are in minutes, we'll update this later to not hardcode
                        const category = activity.category;
                        newSummarizedActivities[id] = { name, duration, unit, category, completionCount: status === "completed" ? 1 : 0, totalCount: 1 };
                    }
                });
            });
            setSummarizedActivities(newSummarizedActivities);
        }
        summarizeActivities();
    }, [activitiesByDay]); // Dependency on activitiesByDay to summarize activities

 
   
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

            
            {/* header */}
            <GoBackHeader text="Home"/>
            
            {/* main content */}
            <div className="flex flex-col lg:flex-row items-center justify-center p-6 pb-36 lg:gap-24 gap-10 min-h-screen relative">        
                
                <div className="w-full max-w-md gap-4 relative">
                    {/* select week dropdown */}
                    <WeekDropdown selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />

                    {/* chart */}
                    <ReportChart activitiesByDay={activitiesByDay}/>
                </div>
                
                
                
                {/* activity report */}
                <div className="w-full max-w-md min-h-[224px] flex flex-col item-start justify-start">
                    <p className="text-primary text-lg font-semibold pb-4">Progress of this week</p>
                    {/* <ActivityReportWidget name="Study" duration={30} unit={"minute"} category="study" completionCount={3} totalCount={5}/> */}
                    {summarizedActivities && Object.entries(summarizedActivities).map(([id, activity]) => {
                        return (
                            <ActivityReportWidget key={id} {...activity}/>
                        );
                    })} 
                </div>
            </div>
            

            {/* menu bar */}
            <MenuBar activeButton={"report"}/>
        </div>
    );
}
