import {db} from "@/data/firebaseConfig";
import {collection, doc, setDoc, getDoc, getDocs, query, where, deleteDoc} from "firebase/firestore";

// ------------------------- store user ------------------------
export async function POST(req, res) { // This function will be called when user signs up

    // Get the data from the request
    const body = await req.json();
    let { firstName, lastName, uid } = body;

    // write data to db
    const collectionRef = collection(db, "users");
    try {
        // Create a new document with an auto-generated ID within the "activities" collection
        const docRef = doc(collectionRef, uid); // Generates a new document reference
        await setDoc(docRef, {
            firstName,
            lastName,
        }); // Write the data to Firestore
        console.log("Document written with UID:", uid);
        return Response.json({ status:200, message: "success" });
    } catch (error) {
        console.log(error);
        return Response.json({  status:500, error: error.message });
    }
}

// ------------------------- get user upon login ------------------------
export async function GET(req) { // called when user logs in
    try {
        // Parse the URL query parameter to get the `uid`
        const url = new URL(req.url);
        const uid = url.searchParams.get("uid"); // e.g., /api/users?uid=USER_ID

        if (!uid) {
            return Response.json({ status: 400, message: "Missing UID parameter" });
        }

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = {
                firstName: docSnap.data().firstName,
                lastName: docSnap.data().lastName,
                email: docSnap.data().email,
            };

            // Save user data as a JSON string in localStorage
            localStorage.setItem("currentUser", JSON.stringify(userData));

            return Response.json({ status: 200, data: docSnap.data() });
        } else {
            return Response.json({ status: 404, message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return Response.json({ status: 500, message: error.message });
    }
}