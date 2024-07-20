import dbConnect from "@/lib/dbConnection";
import Client from "@/models/clientModel";

interface VerifyProps {
  params: {
    entity: string;
    customer: string;
  };
}

export async function GET(request: Request, context: VerifyProps) {
  await dbConnect();
  try {
    const { entity, customer } = context.params;
    const verifyclient = await Client.find({
      entity_name: entity,
      town_name: customer,
      audited_yno: "Yes",
    });

    if (verifyclient) {
      return Response.json({ customers: verifyclient }, { status: 200 });
    } else {
      return Response.json(
        { messaeg: "No Verify Customer Found" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.log(error?.message);
    return Response.json(
      { message: "Failed to Fetch Verify Customer Api" },
      { status: 500 }
    );
  }
}
