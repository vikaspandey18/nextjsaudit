import dbConnect from "@/lib/dbConnection";
import Audit from "@/models/auditModel";

interface AuditCustomerProps {
  params: {
    customerid: string;
  };
}

export async function GET(request: Request, context: AuditCustomerProps) {
  await dbConnect();
  try {
    const { customerid } = context.params;

    const customer = await Audit.findOne({ customerid }).populate("customerid");
    if (customer) {
      return Response.json(
        { message: "Customer Found", customer },
        { status: 200 }
      );
    } else {
      return Response.json(
        { message: "Failed to Find Audit customer", customer },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.log(error.message);
    return Response.json(
      { message: "Failed To Get Audited Customer api" },
      { status: 500 }
    );
  }
}
