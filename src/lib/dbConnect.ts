import mongoose from "mongoose";

type ConnectionObject = {
  isconnected: number | null;
};

const connection: ConnectionObject = {
  isconnected: null,
};

async function dbConnect(): Promise<void> {
  if (connection.isconnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL || "", {});
    connection.isconnected = db.connections[0].readyState;
  } catch (error) {
    process.exit(1);
  }
}

export default dbConnect;
