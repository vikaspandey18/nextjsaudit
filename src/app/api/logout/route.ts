import dbConnect from "@/lib/dbConnection";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  await dbConnect();
  try {
    cookies().delete("token");
    return Response.json({ message: "Logout Successfull" }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return Response.json({ message: "Error in Logout Api" }, { status: 500 });
  }
}
