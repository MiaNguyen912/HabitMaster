import {activities, addActivity } from '@/data/activities';

export async function POST(req, res) { // This function will be called when the contact form is submitted with a POST request
    // return Response.json({ message: "POST request succeeds"}, { status: 200 }); 

    const body = await req.json();
    let { name, date, hour, minute, category, remind } = body;

    if (hour==="") {
        hour = 0;
    }
    if (minute==="") {
        minute = 0;
    }

    const newActivity = {
        id: activities.length + 1, 
        name,
        status: "incompleted",
        date: date.replace(/-/g, '/'),
        duration: parseInt(hour) * 60 + parseInt(minute),
        category
    };

    try {
        addActivity(newActivity);
        return Response.json({ status:200, message: "success" }); 
    } catch (error) {
        console.log(error);
        return Response.json({  status:200, error: error.message });
    }
}



export async function GET(req, res) {
    return Response.json({ message: 'This is the Create-activity API' });
}