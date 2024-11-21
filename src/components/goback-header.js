import React from 'react'
import Link from 'next/link'
import { FaArrowLeftLong } from "react-icons/fa6";

const GoBackHeader = ({text}) => {
  return (
    <div className='text-primary-dark text-lg font-semibold w-full fixed p-4'>
        <Link href="/"><FaArrowLeftLong className='inline-block mr-4'/></Link>
        <span className='absolute left-1/2 -translate-x-1/2 md:relative md:left-0'>{text}</span>
    </div>
  )
}

export default GoBackHeader