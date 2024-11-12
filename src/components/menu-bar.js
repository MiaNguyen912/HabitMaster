'use client'
import { FaHome, FaCalendar, FaRegCalendar, FaPlusCircle, FaChartBar, FaRegChartBar, FaUser, FaRegUser } from 'react-icons/fa';
import { BsPlusCircleFill } from "react-icons/bs";


export default function MenuBar({activeButton}) {


  return (
    <header className="relative z-50 ">
      <nav aria-label="Global" className="inset-x-0 bg-secondary fixed flex items-center justify-around py-2 px-4 bottom-0 rounded-t-3xl">
        <div className="flex w-full h-fit justify-around">
          
          {/* Home */}
          <a onClick={() => handleButtonClick('home')} href="/" className={`${activeButton==='home'? 'text-primary' : 'text-tertiary'} flex flex-col items-center justify-center  md:text-lg text-sm font-semibold hover:text-accent`}>
            {activeButton === 'home' ? <FaHome size={24} /> : <FaRegCalendar size={24} />}
            <span>Home</span>
          </a>

          {/* Calendar */}
          <a onClick={() => handleButtonClick('calendar')} href="/calendar" className={`${activeButton==='calendar'? 'text-primary' : 'text-tertiary'} flex flex-col items-center justify-center  md:text-lg text-sm font-semibold hover:text-accent`}>
            {activeButton === 'calendar' ? <FaCalendar size={24} /> : <FaRegCalendar size={24} />}
            <span>Calendar</span>
          </a>


          {/* Add Activity */}
          <a onClick={() => handleButtonClick('add')} href="/add" class=" text-primary border-secondary border-8 rounded-full transform translate-y-[-40%] hover:text-accent">
            <BsPlusCircleFill size={70} className='rounded-full drop-shadow-2xl shadow-2xl' />
          </a>

          {/* Report */}
          <a onClick={() => handleButtonClick('report')} href="/report" className={`${activeButton==='report'? 'text-primary' : 'text-tertiary'} flex flex-col items-center justify-center  md:text-lg text-sm font-semibold hover:text-accent`}>
            {activeButton === 'report' ? <FaChartBar size={24} /> : <FaRegChartBar size={24} />}
            <span>Report</span>
          </a>

           {/* Profile */}
           <a onClick={() => handleButtonClick('profile')} href="/profile" className={`${activeButton==='profile'? 'text-primary' : 'text-tertiary'} flex flex-col items-center justify-center  md:text-lg text-sm font-semibold hover:text-accent`}>
              {activeButton === 'profile' ? <FaUser size={24} /> : <FaRegUser size={24} />}
              <span>Profile</span>
           </a>

        </div>

      </nav>
    </header>
  )
}
