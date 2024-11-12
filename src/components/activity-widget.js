'use client'
import React from 'react'
import Link from 'next/link'
import classes from './activity-widget.module.css'
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


export default function ActivityWidget({id, name, status, date, duration, category}) {


    function getStatusText(status) {
        if (status === "completed") {
            return <p className='font-semibold text-primary'><FaCircleCheck className='inline-block'/> Completed</p>;
        } else {
            return <Link href={`/timer/${id}`} className='font-semibold text-primary hover:text-accent'>Start <FaArrowRightLong className='inline-block'/></Link>;
        }
    }
    const IconComponent = categoryIcon[category];


    return (
        <Link href={`/view/${id}`} className={`${status==="completed"? 'bg-unicorn-pink-purple':'bg-secondary bg-opacity-80'}  p-4 rounded-2xl min-w-[350px] ${classes["widget-shadow"]}`}>
            <div className='flex flex-row justify-start gap-8'>
                <div>
                    {IconComponent && <IconComponent size={50} className='text-[#5337C1]'/>}
                </div>
                <div className='flex flex-col justify-around items-start'>
                    <p className={`${status==="completed"? 'text-secondary':'text-primary'} font-semibold text-lg`}>{name} ({duration}')</p>
                    {getStatusText(status)}
                </div>
            </div>
        </Link>
    )
}
