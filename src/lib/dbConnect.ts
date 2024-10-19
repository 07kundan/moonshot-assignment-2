import mongoose from "mongoose";

type ConnectionObject = {
  isconnected: number | null;
};

const connection: ConnectionObject = {
  isconnected: null,
};

async function dbConnect(): Promise<void> {
  if (connection.isconnected) {
    console.log("Already connected to the database.");
    return;
  }

  const mongoUri = process.env.MONGO_URL;
  if (!mongoUri) {
    throw new Error("MONGO_URL environment variable is not defined.");
  }

  try {
    const db = await mongoose.connect(mongoUri, {});
    connection.isconnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export default dbConnect;
