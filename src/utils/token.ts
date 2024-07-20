import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface PayloadTypes {
  userId: any;
  name: string;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  return secret;
};

export const generateToken = (payload: PayloadTypes) => {
  const token = jwt.sign(payload, getJwtSecret(), { expiresIn: "30d" });
  return token;
};

export const decodeToken = (token: string) => {
  const decode = jwt.verify(token, getJwtSecret());
  return decode;
};
