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


function findCurrentWeekDates(){ // find the dates of mon-sun of the current week
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
    const numCompleted = activities.filter(activity => activity.status === "completed").length;
    if (activities.length === 0) return 0;
    return Math.round(numCompleted / activities.length * 100);
}  

const ReportChart = () => {
    const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
    const [monActivities, setMonActivities] = useState([]);
    const [tueActivities, setTueActivities] = useState([]);
    const [wedActivities, setWedActivities] = useState([]);
    const [thuActivities, setThuActivities] = useState([]);
    const [friActivities, setFriActivities] = useState([]);
    const [satActivities, setSatActivities] = useState([]);
    const [sunActivities, setSunActivities] = useState([]);

    const weekDayActivities = [monActivities, tueActivities, wedActivities, thuActivities, friActivities, satActivities, sunActivities];

    useEffect(() => {
        const weekDays = findCurrentWeekDates();
      
        async function fetchData() {
          try {
            // Fetch activities for all days in parallel
            const responses = await Promise.all(
              weekDays.map((date) =>{
                const result = axios.get('/../api/activity', { params: { date: date } });
                return result;
              })
            );
            setMonActivities(responses[0].data.data);
            setTueActivities(responses[1].data.data);
            setWedActivities(responses[2].data.data);
            setThuActivities(responses[3].data.data);
            setFriActivities(responses[4].data.data);
            setSatActivities(responses[5].data.data);
            setSunActivities(responses[6].data.data);
          } catch (error) {
            console.error('Error:', error.message);
          }
        }
      
        fetchData();
    }, []); 
    
    const completedPercentageList = [];
    weekDayActivities.forEach((dayActivities) => {
        completedPercentageList.push(calculateCompletedPercentage(dayActivities));
    }); 




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
            maxBarThickness: 32, // in pixels
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

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            <Bar data={data} options={options} className={`${classes.chart}`}/>
        </div>
    );
};

export default ReportChart;
