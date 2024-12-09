import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import classes from '@/styles/chart.module.css';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function findCurrentWeekDates() {
    const weekDays = [];
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;

   
    for (let i = 0; i <= 6; i++) { // Set the first day to Monday and loop through 7 days
        const day = new Date(today); // Create a new date for each day
        day.setDate(today.getDate() + diffToMonday + i); // Calculate each day's date
        weekDays.push(day.toDateString()); // Convert to a readable format or keep as a Date object
    }
    return weekDays;
}

function calculateCompletedPercentage(activities) {
    if (!activities || activities.length === 0) return 0; // Handle empty or undefined activities
    const numCompleted = activities.filter(activity => activity.status === "completed").length;
    return Math.round((numCompleted / activities.length) * 100);
}

const ReportChart = ({activitiesByDay}) => {
    const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
    
    // // const weekDayActivities = [monActivities, tueActivities, wedActivities, thuActivities, friActivities, satActivities, sunActivities];
    // const [activitiesByDay, setActivitiesByDay] = useState([[], [], [], [], [], [], []]);

    // useEffect(() => {
    //     const weekDays = findCurrentWeekDates();
      
    //     async function fetchData() {
    //       try {
    //         // Fetch activities for all days in parallel
    //         const user = localStorage.getItem("currentUser");
    //         const uid = user ? JSON.parse(user).uid : null;
    //         const responses = await Promise.all(
    //             weekDays.map(date =>axios.get('/../api/activity', { params: { uid: uid, date: date } }))
    //         );
    //         // Extract activity data and default to an empty array if no data exists
    //         const allActivities = responses.map(res =>
    //             res.data?.data ?? []
    //         );
    //         setActivitiesByDay(allActivities);
    //       } catch (error) {
    //         console.error('Error fetching activities:', error.message);
    //         setActivitiesByDay([[], [], [], [], [], [], []]); // Set all days to empty activities if there's an error
    //       }
    //     }
      
    //     fetchData();
    // }, []); 
    
    // Calculate percentages for each day
    const completedPercentageList = activitiesByDay.map(dayActivities =>
        calculateCompletedPercentage(dayActivities)
    );





    // Chart data
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Task Completion',
                data: completedPercentageList,
                unit: '%',
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                borderRadius: 8, // Rounded corners
                // barThickness: 24, // in pixels
                maxBarThickness: 32, // Max bar thickness in pixels
                barPercentage: 0.5,
                hoverBorderColor: 'blue',
                hoverBackgroundColor: 'red', 

            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Your Weekly Progress',
            },
        },
        scales: {
            y: {
                display: true,
                beginAtZero: true,
                padding: 10,
                max: 100,
                grid: {
                    display: false,
                },
            },
            x: {
                axis: {
                    display: false,
                },
                grid: {
                    display: false,
                }
            },
        },
    };
    if (!activitiesByDay) {
        return <p>Loading...</p>;
    }
    return (
        <div className="w-full max-w-md ">
            <Bar data={data} options={options} className={`${classes.chart}`}/>
        </div>
    );
};

export default ReportChart;
