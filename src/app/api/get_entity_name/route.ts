import dbConnect from "@/lib/dbConnection";
import Client from "@/models/clientModel";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const getentityname = await Client.aggregate([
      { $group: { _id: "$entity_name" } },
      { $project: { _id: 0, getentityname: "$_id" } },
      { $sort: { getentityname: 1 } },
    ]);
    return Response.json({ getentityname }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error To Get Entity Name" },
      { status: 500 }
    );
  }
}
