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
            uid,
        }); // Write the data to Firestore
        console.log("Document written with UID:", uid);
        return Response.json({ status:200, message: "success" });
    } catch (error) {
        console.log(error);
        return Response.json({  status:500, error: error.message });
    }
}