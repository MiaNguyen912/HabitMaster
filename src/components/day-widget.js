import React from 'react'

function getDateInWeek(date) {  // date is a Date object
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = date.getDay(); // return 0 - 6 (Sun - Sat)
    return days[day];
}

function isToday(date) {
    if (date.toDateString() == new Date().toDateString()) {
        return true;
    }
}

function isMainDate(date, mainDate) {
    if (date.toDateString() == mainDate.toDateString()) {
        return true;
    }
}
function isSelectedDate(date, selectedDate) {
    if (date.toDateString() == selectedDate.toDateString()) {
        return true;
    }
}

const DayWidget = ({date, mainDate, selectedDate}) => {

  return (
    <div>
        <div className={`widget-shadow rounded-xl bg-secondary w-[50px] text-primary flex flex-col items-center justify-between p-2 ${isToday(date)? '' : 'opacity-40'} ${isSelectedDate(date, selectedDate)? 'border-2 border-primary opacity-90': ''}`}>
            <p className='font-semibold text-xs'>{getDateInWeek(date)}</p>
            <p className='font-semibold'>{date.getDate()}</p>
        </div>
    </div>
  )
}

export default DayWidget