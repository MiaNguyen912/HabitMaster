import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export async function POST() {
    try {
        // Load the service account key
        const keyPath = path.join(process.cwd(), '/Users/bsteier/Desktop/inf133-habitmaster-444305-de10492a4ca4.json');
        const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));

        // Authenticate with Google API
        const auth = new google.auth.GoogleAuth({
            credentials: serviceAccount,
            scopes: ['https://www.googleapis.com/auth/calendar.event'],
        });

        const calendar = google.calendar({ version: 'v3', auth });

        // Fetch events
        const events = await calendar.events.list({
            calendarId: 'primary', // Replace with specific calendar ID if needed
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });

        return new Response(
            JSON.stringify({ status: 200, events: events.data.items }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching Google Calendar events:', error);
        return new Response(
            JSON.stringify({ status: 500, error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
