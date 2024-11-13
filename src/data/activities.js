const activities = [
    {
        id: 1,
        name: "Read book",
        status: "completed",
        date: "2024/11/12",
        duration: 30,
        category: "study"
    },
    {
        id: 2,
        name: "Read book",
        status: "completed",
        date: "2024/11/12",
        duration: 30,
        category: "study"
    },
    {
      id: 3,
      name: "Read book",
      status: "completed",
      date: "2024/11/12",
      duration: 30,
      category: "study"
  },
    {
        id: 4,
        name: "Meditate",
        status: "incompleted",
        date: "2024/11/12",
        duration: 15,
        category: "personal"
    },
    {
      id: 5,
      name: "Run",
      status: "incompleted",
      date: "2024/11/11",
      duration: 10,
      category: "health"
  }
]

  
function addActivity(activity) {
    activities.push(activity);

}
  

export {activities, addActivity};



// import { getDatabase, ref, set, push } from "firebase/database";

// const db = getDatabase();

// export function addActivity(newActivity) {
//     const activityRef = ref(db, 'activities');
//     const newActivityRef = push(activityRef); // Adds a new record
//     set(newActivityRef, newActivity); // Sets the new activity in the DB
// }