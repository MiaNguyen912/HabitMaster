import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        // Parse the request body to get event details
        const body = await request.json();
        const { name, date, duration, recurring, category, remind } = body;

        // Load the service account key
        const keyPath =  '/Users/bsteier/Desktop/inf133-habitmaster-444305-de10492a4ca4.json';
        const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));

        // Authenticate with Google API
        const auth = new google.auth.GoogleAuth({
            credentials: serviceAccount,
            scopes: ['https://www.googleapis.com/auth/calendar'],
        });

        const calendar = google.calendar({ version: 'v3', auth });

        // Create the event's start and end times
        const startDateTime = new Date(date);
        const endDateTime = new Date(startDateTime.getTime() + duration * 60 * 1000 + 2);


        // Construct the event object
        const event = {
            summary: name,
            description: `Category: ${category}. Reminder: ${remind ? "Yes" : "No"}`,
            start: {
                dateTime: startDateTime.toISOString(),
                timeZone: 'America/Los_Angeles',
            },
            end: {
                dateTime: endDateTime.toISOString(),
                timeZone: 'America/Los_Angeles',
            },
            recurrence: recurring?.length
                ? [`RRULE:FREQ=WEEKLY;BYDAY=${recurring.map(day => day.slice(0, 2).toUpperCase()).join(',')}`]
                : undefined,
        };

        // Insert the event into Google Calendar
        const response = await calendar.events.insert({
            'calendarId': 'c_305bec7cb7730d43d3f88bb9afe4b8c139cc3154c08f41c3be46b66e77331bb0@group.calendar.google.com',
            'resource': event,
        });

        console.log(response.data);
        // Return the created event details
        return new Response(
            JSON.stringify({ status: 200, event: response.data }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error adding event to Google Calendar:', error);
        return new Response(
            JSON.stringify({ status: 500, error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
