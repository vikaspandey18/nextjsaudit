import dbConnect from "@/lib/dbConnection";
import Client from "@/models/clientModel";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { userid } = await request.json();
    const getentityname = await Client.findById(userid);
    return Response.json({ getentityname }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error To Get Entity Name" },
      { status: 500 }
    );
  }
}
