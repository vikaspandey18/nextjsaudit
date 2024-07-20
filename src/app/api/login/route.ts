import dbConnect from "@/lib/dbConnection";
import User from "@/models/userModel";
import { generateToken } from "@/utils/token";
import { loginValidationSchema } from "@/validationSchema/loginSchema";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  await dbConnect();
  try {
    //GETTING POST DATA
    const { mobile, password } = await request.json();

    //VALIDATING POST DATA
    const checkParam = {
      mobile,
      password,
    };

    const result = loginValidationSchema.safeParse(checkParam);

    if (!result.success) {
      const loginErrors = result.error.flatten().fieldErrors;
      return Response.json(
        {
          message: loginErrors?.mobile || loginErrors?.password,
        },
        { status: 400 }
      );
    }

    //CHECKING USER EXISISTS
    const user = await User.findOne({ mobile, password });
    if (user) {
      user.password = "";
      const token = generateToken({ userId: user?._id, name: user.name }); //GENERATING TOKEN
      cookies().set("token", token, { httpOnly: true }); //CREATE COOKIES
      return Response.json(
        { message: "Login Successfully", user },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "Sorry No User Found" }, { status: 400 });
    }
  } catch (error) {
    return Response.json(
      { message: "Failed to Login Process" },
      { status: 500 }
    );
  }
}
