import {db} from "@/data/firebaseConfig";
import {collection, doc, setDoc, getDocs, query, where, and} from "firebase/firestore";


// ------------------------- create a new activity ------------------------
export async function POST(req, res) { // This function will be called when the contact form is submitted with a POST request
    // return Response.json({ message: "POST request succeeds"}, { status: 200 }); 

    // Get the data from the request
    const body = await req.json();
    let { name, date, recurring, duration, category, remind } = body;

    const newActivity = {
        name,
        date,
        recurring,
        duration,
        category,
        status: "incompleted",
        remind
    };

    // write data to db
    const collectionRef = collection(db, "activities");
    try {
        // Create a new document with an auto-generated ID within the "activities" collection
        const docRef = doc(collectionRef); // Generates a new document reference
        await setDoc(docRef, newActivity); // Write data to the new document

        return Response.json({ status:200, message: "success" }); 
    } catch (error) {
        console.log(error);
        return Response.json({  status:500, error: error.message });
    }
}


// ------------------------- read all activities / read activities by specific date -------------------------
async function getActivitiesByDate(targetDate, res) {
    const daysOfWeek = {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat"
    };
    const targetDateOfWeek = targetDate.getDay();

    try {
        const data = [];
        const collectionRef = collection(db, "activities");
  
        const q = query(
            collectionRef, 
            where("date", ">=", targetDate.toDateString()),
            where("recurring", "array-contains", daysOfWeek[targetDateOfWeek])
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data()});
        });

        return Response.json({ status:200, message: "success", data: data });
    } catch (error) {
        console.log(error);
        return Response.json({ status:500, error: error.message });
    }
}
async function getAllActivities() {
    try {
        const data = [];
        const collectionRef = collection(db, "activities");
        const docSnapshot = await getDocs(collectionRef);
        docSnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data()});
        });
        return Response.json({ status:200, message: "success", data: data });
    } catch (error) {
        console.log(error);
        return Response.json({ status:500, error: error.message });
    }
}

export async function GET(req, res) { 
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const targetDate = searchParams.get("date");    // url: /api/activity?date=%222024/11/15%22
    if (targetDate) {
        return getActivitiesByDate(new Date(targetDate));
    } else {
        return getAllActivities();
    }
}


// ------------------------- update an activity-------------------------
export async function PUT(req, res) {
    const body = await req.json();
    const { id, name, status, date, duration, category } = body;

    const updatedActivity = {
        name,
        status,
        date: new Date(date.replace(/-/g, '/')),
        duration,
        category
    };

    const docRef = doc(db, "activities", id);
    try {
        await setDoc(docRef, updatedActivity, { merge: true });
        return Response.json({ status:200, message: "success" });
    } catch (error) {
        console.log(error);
        return Response.json({ status:500, error: error.message });
    }
}


// ------------------------- delete an activity -------------------------
export async function DELETE(req, res) {
    const body = await req.json();
    const { id } = body;

    const docRef = doc(db, "activities", id);
    try {
        await setDoc(docRef, {status: "deleted"}, { merge: true });
        return Response.json({ status:200, message: "success" });
    } catch (error) {
        console.log(error);
        return Response.json({ status:500, error: error.message });
    }
}