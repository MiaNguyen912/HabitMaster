import { db } from "@/data/firebaseConfig";
import { collection, doc, setDoc, getDoc, getDocs, query, where, deleteDoc, Timestamp } from "firebase/firestore";

// ------------------------- create a new activity ------------------------
export async function POST(req, res) {
    const body = await req.json();
    let { uid, name, date, recurring, duration, category, remind } = body;

    const newActivity = {
        uid,
        name,
        date: Timestamp.fromDate(new Date(date)), // Converts a JavaScript Date to a Firestore Timestamp
        recurring,
        duration,
        category,
        status: "incompleted",
        remind,
    };

    const collectionRef = collection(db, "activities");
    try {
        const docRef = doc(collectionRef);
        await setDoc(docRef, newActivity);
        return Response.json({ status: 200, message: "success" });
    } catch (error) {
        console.log(error);
        return Response.json({ status: 500, error: error.message });
    }
}

// ------------------------- read activities (all, by date, by id) -------------------------
async function getActivitiesByDate(targetDate, uid) {
    const daysOfWeek = {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat",
    };
    const targetDateOfWeek = targetDate.getDay();

    try {
        const data = [];
        const collectionRef = collection(db, "activities");
        const q = query(
            collectionRef,
            where("uid", "==", uid),
            where("date", "<=", targetDate),
            where("recurring", "array-contains", daysOfWeek[targetDateOfWeek])
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return Response.json({ status: 200, message: "No activities found", data: [] });
        }

        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        console.log(data);

        const targetDateCompletedDocRef = doc(db, "daily_completed", targetDate.toDateString());
        const targetDateCompletedSnapshot = await getDoc(targetDateCompletedDocRef);
        let completedActivities = [];
        if (targetDateCompletedSnapshot.exists()) {
            completedActivities = targetDateCompletedSnapshot.data().activity_id;
        }

        data.forEach((activity) => {
            if (completedActivities.includes(activity.id)) {
                activity.status = "completed";
            }
        });

        return Response.json({ status: 200, message: "success", data });
    } catch (error) {
        console.log(error);
        return Response.json({ status: 500, error: error.message });
    }
}

async function getAllActivities(uid) {
    try {
        const data = [];
        const collectionRef = collection(db, "activities");

        const q = query(collectionRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return Response.json({ status: 200, message: "No activities found", data: [] });
        }

        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });

        return Response.json({ status: 200, message: "success", data });
    } catch (error) {
        console.log(error);
        return Response.json({ status: 500, error: error.message });
    }
}

async function getActivityByID(id) {
    try {
        const docRef = doc(db, "activities", id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            return Response.json({ status: 200, message: "success", data: { id, ...docSnapshot.data() } });
        } else {
            return Response.json({ status: 404, message: "No such document!" });
        }
    } catch (error) {
        console.log(error);
        return Response.json({ status: 500, error: error.message });
    }
}

export async function GET(req, res) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const targetDate = searchParams.get("date");
    const id = searchParams.get("id");
    const uid = searchParams.get("uid");


    if (targetDate) {
        return getActivitiesByDate(new Date(targetDate), uid);
    } else if (id) {
        return getActivityByID(id);
    } else {
        return getAllActivities(uid);
    }
}

// ------------------------- update an activity -------------------------
export async function PUT(req, res) {
    const body = await req.json();
    const { id, name, recurring, date, duration, category, remind, status } = body;

    const updatedActivity = { name, date: Timestamp.fromDate(new Date(date)), recurring, duration, category, remind };

    const activitiesDocRef = doc(db, "activities", id);
    try {
        await setDoc(activitiesDocRef, updatedActivity, { merge: true });

        if (status === "completed") {
            const today = new Date();
            const todayCompletedDocRef = doc(db, "daily_completed", today.toDateString());
            const todayCompletedSnapshot = await getDoc(todayCompletedDocRef);

            if (!todayCompletedSnapshot.exists()) {
                await setDoc(todayCompletedDocRef, { activity_id: [id] });
            } else {
                if (!todayCompletedSnapshot.data().activity_id.includes(id)) {
                    const updatedActivityList = [...todayCompletedSnapshot.data().activity_id, id];
                    await setDoc(todayCompletedDocRef, { activity_id: updatedActivityList });
                }
            }
        }
        return Response.json({ status: 200, message: "success" });
    } catch (error) {
        console.log(error);
        return Response.json({ status: 500, error: error.message });
    }
}

// ------------------------- delete an activity -------------------------
export async function DELETE(req, res) {
    const body = await req.json();
    const { id } = body;

    const docRef = doc(db, "activities", id);
    try {
        await deleteDoc(docRef);
        return Response.json({ status: 200, message: "success" });
    } catch (error) {
        console.log(error);
        return Response.json({ status: 500, error: error.message });
    }
}
