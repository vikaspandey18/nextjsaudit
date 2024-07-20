import dbConnect from "@/lib/dbConnection";
import Client from "@/models/clientModel";

interface EntityProps {
  params: {
    entity: string;
  };
}

export async function GET(request: Request, context: EntityProps) {
  await dbConnect();

  try {
    const { entity } = context.params;

    // const towns = await Client.find({ entity_name: entity });
    const towns = await Client.aggregate([
      {
        $match: { entity_name: entity },
      },
      {
        $group: { _id: "$town_name", count: { $sum: 1 } },
      },
      {
        $project: { _id: 0, towns: "$_id", count: 1 },
      },
      {
        $sort: { towns: 1 },
      },
    ]);

    if (towns.length > 0) {
      return Response.json(
        { message: "Town Found Successfully", towns },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "Failed To find Town" }, { status: 400 });
    }
  } catch (error) {
    return Response.json(
      { message: "Error Occured while Fetching Town Name" },
      { status: 500 }
    );
  }
}
