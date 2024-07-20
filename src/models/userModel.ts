import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
  mobile: number;
  password: string;
}

const UserSchema: Schema<User> = new Schema(
  {
    name: { type: String, trim: true, required: [true, "Name is requried"] },
    mobile: {
      type: Number,
      trim: true,
      required: [true, "Mobile  is required"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default User;
