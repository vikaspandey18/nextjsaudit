import mongoose, { Schema, Document } from "mongoose";

export interface Audit extends Document {
  sga_avaliable: string;
  serial_number: string;
  outlet_code: string;
  outlet_name: string;
  remark: string;
  visiting_card?: string;
  machine_image?: string;
  other_image?: string;
  userid: mongoose.Schema.Types.ObjectId;
  customerid: mongoose.Schema.Types.ObjectId;
}

const AuditSchema: Schema<Audit> = new Schema(
  {
    sga_avaliable: {
      type: String,
      required: [true, "SGA Avaliable is requried"],
      trim: true,
    },
    serial_number: {
      type: String,
      required: [true, "Serial Number is requried"],
      trim: true,
    },
    outlet_code: {
      type: String,
      required: [true, "Outlet Code is requried"],
      trim: true,
    },
    outlet_name: {
      type: String,
      required: [true, "Outlet Name is requried"],
      trim: true,
    },
    remark: {
      type: String,
      trim: true,
    },
    visiting_card: {
      type: String,
      trim: true,
    },
    machine_image: {
      type: String,
      trim: true,
    },
    other_image: {
      type: String,
      trim: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    customerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  },
  {
    timestamps: true,
  }
);

const Audit =
  (mongoose.models.Audit as mongoose.Model<Audit>) ||
  mongoose.model<Audit>("Audit", AuditSchema);

export default Audit;
