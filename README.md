HabitMaster

### run the project:
npm install 
npm run dev

### Note:
- global colors (primary, secondary, etc) are configurated in tailwind.config.js
- api:
    - to create new task: send POST request to http://localhost:3000/api/activity
    - to see all tasks: send GET to http://localhost:3000/api/activity
    - to see tasks on specific date: send GET to like http://localhost:3000/api/activity?date="2024/11/14" (this display recurring activities on every Thurday from 11/14/2024)
    - to see a task with a specific id: send GET to http://localhost:3000/api/activity?id=0cVrjm6RqIvKZdAxoBO2
    - data format example: 
        ```
        {
            "status": 200,
            "message": "success",
            "data": [
                {
                    "id": "kWXpSMMqoMFDH0MH0Kfc",
                    "name": "test 5",
                    "date": "Thu Nov 14 2024",
                    "recurring": [
                        "Wed",
                        "Thu"
                    ],
                    "duration": 0,
                    "category": "study",
                    "status": "incompleted",
                    "remind": false
                }
            ]
        }
        ```

### FireStore setup:
1. create a collection with name "activities"
2. set up a query index for "activities" collection with the details below (to make the combined query in the get-activities-by-date api works)
    collectionID: activities,
    recurring: array,
    date: ascending,
    name: ascending,
    scope: collection

### resources
- clip path generator: https://www.cssportal.com/css-clip-path-generator/
- firestore doc: https://firebase.google.com/docs/firestore/query-data/get-data, https://firebase.google.com/docs/firestore/query-data/queries

