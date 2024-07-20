import mongoose, { Schema, Document } from "mongoose";

export interface Client extends Document {
  entity_name: string;
  customer_id: string;
  customer_name: string;
  city: string;
  contact_person: string;
  phone_no: string;
  district_name: string;
  town_name: string;
  sm_name: string;
  se_name: string;
  audited_yno: string;
  sga_available: string;
  serial_number: string;
  remark: string;
  asset_serial_no: string;
}

const ClientSchema: Schema<Client> = new Schema(
  {
    entity_name: {
      type: String,
      trim: true,
      required: [true, "Entity Name is Required"],
    },
    customer_id: {
      type: String,
      trim: true,
    },
    customer_name: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    contact_person: {
      type: String,
      trim: true,
    },
    phone_no: {
      type: String,
      trim: true,
    },
    district_name: {
      type: String,
      trim: true,
    },
    town_name: {
      type: String,
      trim: true,
    },

    sm_name: {
      type: String,
      trim: true,
    },
    se_name: {
      type: String,
      trim: true,
    },
    audited_yno: {
      type: String,
      trim: true,
    },
    sga_available: {
      type: String,
      trim: true,
    },
    serial_number: {
      type: String,
      trim: true,
    },
    remark: {
      type: String,
      trim: true,
    },
    asset_serial_no: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client =
  (mongoose.models.Client as mongoose.Model<Client>) ||
  mongoose.model<Client>("Client", ClientSchema);

export default Client;
