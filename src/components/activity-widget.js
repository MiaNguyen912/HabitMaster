'use client'
import React from 'react'
import Link from 'next/link'
import { FaBookOpen, FaRunning } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { RiMentalHealthFill } from "react-icons/ri";
import { FaArrowTrendUp, FaArrowRightLong, FaCircleCheck } from "react-icons/fa6";
import { BsTrash3Fill } from "react-icons/bs";
import axios from 'axios';


const categoryIcon = {
    "study": FaBookOpen,
    "work": MdWork,
    "personal": RiMentalHealthFill,
    "health": FaRunning,
    "other": FaArrowTrendUp
}


export default function ActivityWidget({id, name, status, date, duration, category, selectedDate, deleteFunction}) {

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
            const activityDate = new Date(date);
            const targetDate = new Date(selectedDate); 
            if (compareDates(activityDate, targetDate) >= 0) {
                return <Link href={`/timer/${id}`} className='font-semibold text-primary hover:text-accent'>Start <FaArrowRightLong className='inline-block'/></Link>;
            } else {
                return <p className='font-semibold text-accent'>Task Overdue</p>;
            }
        }
    }
    const IconComponent = categoryIcon[category];

 


    return (
        <div className='relative w-full flex'>
            <button className='absolute top-0 right-0 p-2 z-100 text-accent bg-secondary bg-opacity-80 rounded-full translate-x-1/3 -translate-y-1/3 hover:text-primary' onClick={(e)=>{deleteFunction(e, name, id)}}>
                <BsTrash3Fill/>
            </button>
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
        </div>
        
    )
}
