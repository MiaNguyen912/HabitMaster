# HabitMaster 
Hosted at https://habit-master-2fcz6twq6-mianguyen912s-projects.vercel.app/?vercelToolbarCode=dDSCjYT1bBY8bMU

### Steps to run the project locally:
- 1: npm install 
- 2: npm run dev
- 3: The project's landing page is a Login page, you can choose to register an account or use our testing account (tester@email.com - password: 123456)


### resources
- clip path generator: https://www.cssportal.com/css-clip-path-generator/
- firestore doc: https://firebase.google.com/docs/firestore/query-data/get-data, https://firebase.google.com/docs/firestore/query-data/queries
- countdown clock React library: https://www.npmjs.com/package/react-countdown-circle-timer
- GoogleChart API: https://www.w3schools.com/graphics/plot_google_chart.asp, https://developers.google.com/chart, https://www.react-google-charts.com/
- chart.js API: https://www.chartjs.org/docs/latest/
- dropdown list: https://headlessui.com/react/menu

### Note:
- API usage note:
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
