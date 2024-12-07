import {db} from "@/data/firebaseConfig";
import {collection, doc, setDoc, getDoc, getDocs, query, where, deleteDoc} from "firebase/firestore";


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


// ------------------------- read activities (all, by date, by id) -------------------------
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

        // get the daily_completed activities for the target date and update the status of the activity (since status is set to "incompleted" by default)
        const targetDateCompleted_docRef = doc(db, "daily_completed", targetDate.toDateString());
        const targetDateCompleted_doc_snapshot = await getDoc(targetDateCompleted_docRef);
        let completedActivities = [];
        if (targetDateCompleted_doc_snapshot.exists()) {
            completedActivities = targetDateCompleted_doc_snapshot.data().activity_id;
        }
        data.forEach((activity) => {
            if (completedActivities.includes(activity.id)) {
                activity.status = "completed"; // update the status 
            }
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

async function getActivityByID(id) {
    try {
        const docRef = doc(db, "activities", id); // id is used as the doc name
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            return Response.json({ status:200, message: "success", data: { id: id, ...docSnapshot.data()}}); 
        } else {
            return Response.json({ status:404, message: "No such document!" });
        }
    } catch (error) {
        console.log(error);
        return Response.json({ status:500, error: error.message });
    }
}


export async function GET(req, res) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const targetDate = searchParams.get("date");    // url: /api/activity?date=%222024/11/15%22
    const id = searchParams.get("id");    // url: /api/activity?id=%22abcdefc%22
    if (targetDate) {
        return getActivitiesByDate(new Date(targetDate));
    } else if (id) {
        return getActivityByID(id);
    } else {
        return getAllActivities();
    }
}


// ------------------------- update an activity-------------------------
export async function PUT(req, res) {
    const body = await req.json();
    const { id, name, recurring, date, duration, category, remind, status } = body;

    const updatedActivity = {
        name,
        date,
        recurring,
        duration,
        category,
        remind,
    };
    console.log(updatedActivity);
    const activities_docRef = doc(db, "activities", id);
    try {
        await setDoc(activities_docRef, updatedActivity, { merge: true });

        // add id to the daily_completed doc if status change to "completed"
        if (status === "completed") {
            const today = new Date();
            const todayCompleted_docRef = doc(db, "daily_completed", today.toDateString());
            const todayCompleted_doc_snapshot = await getDoc(todayCompleted_docRef);

            // if the date is not in the daily_completed collection, create a new doc
            if (!todayCompleted_doc_snapshot.exists()) {
                await setDoc(todayCompleted_docRef, { activity_id: [id] });
            } else {
                // else, update the existing doc
                if (!todayCompleted_doc_snapshot.data().activity_id.includes(id)) {
                    const updatedActivityList = [...todayCompleted_doc_snapshot.data().activity_id, id];
                    await setDoc(todayCompleted_docRef, { activity_id: updatedActivityList });
                }
            }


        }   
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
    console.log(id);

    const docRef = doc(db, "activities", id);
    try {
        await deleteDoc(docRef);
        return Response.json({ status:200, message: "success" });
    } catch (error) {
        console.log(error);
        return Response.json({ status:500, error: error.message });
    }
}