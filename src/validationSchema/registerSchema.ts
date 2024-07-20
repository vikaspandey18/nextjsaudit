import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be 5 or more characters long" })
    .max(15, { message: "Must be 15 or fewer characters long" }),
  mobile: z
    .string({ message: "Mobile Number must be number" })
    .min(10, { message: "Mobile must be 10 or fewer characters long" }),
  password: z
    .string()
    .min(5, { message: "Password must be 5 or more characters long" })
    .max(10, { message: "Password must be 10 or fewer characters long" }),
});
