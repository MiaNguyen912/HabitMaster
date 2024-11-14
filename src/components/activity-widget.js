'use client'
import React from 'react'
import Link from 'next/link'
import { FaBookOpen, FaRunning } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { RiMentalHealthFill } from "react-icons/ri";
import { FaArrowTrendUp, FaArrowRightLong, FaCircleCheck } from "react-icons/fa6";



const categoryIcon = {
    "study": FaBookOpen,
    "work": MdWork,
    "personal": RiMentalHealthFill,
    "health": FaRunning,
    "other": FaArrowTrendUp
}


export default function ActivityWidget({id, name, status, date, duration, category, selectedDate}) {

    function compareDates(date1, date2) {   
        if (date1.getFullYear() > date2.getFullYear()) {
            return 1;
        } else if (date1.getFullYear() < date2.getFullYear()) {
            return -1;
        } else {
            if (date1.getMonth() > date2.getMonth()) {
                return 1;
            } else if (date1.getMonth() < date2.getMonth()) {
                return -1;
            } else {
                if (date1.getDate() > date2.getDate()) {
                    return 1;
                } else if (date1.getDate() < date2.getDate()) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    }

    function getStatusText(status) {
        if (status === "completed") {
            return <p className='font-semibold text-primary'><FaCircleCheck className='inline-block'/> Completed</p>;
        } else {
            const today = new Date();
            const targetDate = new Date(selectedDate); 
            if (compareDates(targetDate, today) >= 0) {
                return <Link href={`/timer/${id}`} className='font-semibold text-primary hover:text-accent'>Start <FaArrowRightLong className='inline-block'/></Link>;
            } else {
                return <p className='font-semibold text-accent'>Missed</p>;
            }
        }
    }
    const IconComponent = categoryIcon[category];


    return (
        <Link href={`/view/${id}`} className={`${status==="completed"? 'bg-unicorn-pink-purple':'bg-secondary bg-opacity-80'} px-6 py-4 rounded-xl w-full widget-shadow`}>
            <div className='flex flex-row justify-start gap-8'>
                <div>
                    {IconComponent && <IconComponent size={50} className='text-[#5337C1]'/>}
                </div>
                <div className='flex flex-col justify-around items-start'>
                    <p className={`${status==="completed"? 'text-secondary':'text-primary'} font-semibold text-lg`}>{name} ({duration}&apos;)</p>
                    {getStatusText(status)}
                </div>
            </div>
        </Link>
    )
}
