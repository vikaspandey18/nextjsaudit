import dbConnect from "@/lib/dbConnection";
import User from "@/models/userModel";
import { registerValidationSchema } from "@/validationSchema/registerSchema";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { name, mobile, password } = await request.json();

    //VALIDATION OF POST DATA
    const queryParam = {
      name,
      mobile,
      password,
    };

    const result = registerValidationSchema.safeParse(queryParam);

    if (!result.success) {
      const registrationError = result.error.flatten().fieldErrors;
      return Response.json(
        { message: registrationError?.name || registrationError?.mobile },
        { status: 400 }
      );
    }

    //CHECKING IF THE USER EXITS
    const existingUser = await User.findOne({ mobile });

    if (existingUser) {
      return Response.json(
        { message: "Mobile No Already Register" },
        { status: 400 }
      );
    }

    const user = await User.create({ name, mobile, password });

    if (user) {
      return Response.json({ message: "Login Successfully" }, { status: 200 });
    } else {
      return Response.json({ message: "Failed to Login" }, { status: 400 });
    }
  } catch (error) {
    return Response.json(
      { message: "Error in the Login Process" },
      { status: 500 }
    );
  }
}
