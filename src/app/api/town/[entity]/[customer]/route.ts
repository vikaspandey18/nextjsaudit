import dbConnect from "@/lib/dbConnection";
import Client from "@/models/clientModel";

interface CustomerProps {
  params: {
    entity: string;
    customer: string;
  };
}

export async function GET(request: Request, context: CustomerProps) {
  await dbConnect();
  try {
    const { entity, customer } = context.params;

    const customers = await Client.find(
      {
        entity_name: entity,
        town_name: customer,
        audited_yno: null,
      },
      { customer_name: 1, phone_no: 1 }
    ).sort({ town_name: 1 });

    if (customers.length > 0) {
      return Response.json(
        { message: "Customer Found Successfully", customers },
        { status: 200 }
      );
    } else {
      return Response.json(
        { message: "Failed to Found customer city" },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json(
      { message: "Error has occured in Customer Data" },
      { status: 500 }
    );
  }
}
