import mongoose from "mongoose";

type ConnectionOjbect = {
  isConnection?: number;
};

const connection: ConnectionOjbect = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnection) {
    console.log("Already Connection Established");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL || "");
    connection.isConnection = db.connections[0].readyState;
    console.log(`Database connected at ${db.connection.host}`);
  } catch (error) {
    console.log("Failed to Connect to Database => " + error);
    process.exit(1);
  }
};

export default dbConnect;
