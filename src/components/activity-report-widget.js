'use client'
import React from 'react'
import Link from 'next/link'
import { FaBookOpen, FaRunning } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { RiMentalHealthFill } from "react-icons/ri";
import { FaArrowTrendUp, FaArrowRightLong, FaCircleCheck } from "react-icons/fa6";
import { BsTrash3Fill } from "react-icons/bs";


const categoryIcon = {
    "study": FaBookOpen,
    "work": MdWork,
    "personal": RiMentalHealthFill,
    "health": FaRunning,
    "other": FaArrowTrendUp
}


export default function ActivityReportWidget({name, duration, unit, category, completionCount, totalCount}) {
    const IconComponent = categoryIcon[category];
    const totalQuantity = duration*totalCount;
    const completedQuantity = duration*completionCount;

    return (
        <div className='relative w-full flex mb-4'>
            <div className={`bg-secondary bg-opacity-80 px-6 py-4 rounded-xl w-full widget-shadow`}>
                <div className='flex flex-row justify-start gap-8'>
                    <div>
                        {IconComponent && <IconComponent size={50} className='text-[#5337C1]'/>}
                    </div>
                    <div className='flex flex-col justify-around items-start'>
                        <p className={`text-primary text-sm`}>{totalQuantity} {totalQuantity==1? unit : unit+'s'} of {name.toLowerCase()}</p>
                        <p className='text-lg font-semibold text-primary'>{completedQuantity}/{totalQuantity} completed</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
