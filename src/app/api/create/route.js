
export async function POST(req, res) { // This function will be called when the contact form is submitted with a POST request
    // return Response.json({ message: "POST request succeeds"}, { status: 200 }); 

    const body = await req.json();
    const { name, date, hour, minute, category, remind } = body;

    try {
        
        return Response.json({ status: 200 }); 
    } catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}



export async function GET(req, res) {
    return Response.json({ message: 'This is the Create-activity API' });
}