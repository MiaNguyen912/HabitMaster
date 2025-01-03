import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });

export async function POST(request) {
    const body = await request.json(); // body has format: { userMessage: 'message' }
    const userMessage = body.userMessage;
    console.log('User message:', userMessage);

    // call OpenAI API
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: 'developer', content: 
                `You are a helpful assistant for a habit-tracking app. 
                The app allows user to view, create, update, and delete their weekly, 
                recurring habits, and also provides weekly report based on user's 
                completions. A habit objest has the following properties: 
                name, description, and completions.`
            },
            { role: "user", content: userMessage},
        ],
    });
    
    console.log(completion.choices[0].message);



    return Response.json({ status: 200, message: "success", data: completion.choices[0].message.content });

    // try {
    // const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${apiKey}`,
    //     },
    //     body: JSON.stringify(payload),
    // });

    // if (!response.ok) {
    //     throw new Error('Failed to fetch AI response');
    // }

    // const data = await response.json();
    //     return data.choices[0].message.content; // Extract the AI's response
    // } catch (error) {
    //     console.error(error);
    //     return 'Oops! Something went wrong while fetching the AI response.';
    // }
}