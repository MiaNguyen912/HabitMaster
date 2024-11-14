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
1. collection name: "activities"
2. remember to set up a query index in firebase collection (with the variables below) to make the GET request by date works
    collectionID: activities,
    recurring: array,
    date: ascending,
    name: ascending,
    scope: collection

### resources
- clip path generator: https://www.cssportal.com/css-clip-path-generator/
- firestore doc: https://firebase.google.com/docs/firestore/query-data/get-data, https://firebase.google.com/docs/firestore/query-data/queries

