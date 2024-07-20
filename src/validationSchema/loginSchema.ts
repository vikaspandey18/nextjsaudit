import { z } from "zod";

export const loginValidationSchema = z.object({
  mobile: z
    .string({ message: "Mobile Number should be number" })
    .min(10, { message: "Mobile Number should be of 10 digit" }),
  password: z
    .string()
    .min(5, { message: "Password must be 5 or more characters long" })
    .max(10, { message: "Password must be 10 or fewer characters long" }),
});
