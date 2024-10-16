import mongoose from "mongoose";

type ConnectionObject = {
  isconnected: number | null;
};

const connection: ConnectionObject = {
  isconnected: null,
};

async function dbConnect(): Promise<void> {
  if (connection.isconnected) {
    console.log("database is already connected");
    return;
  }
  console.log(process.env.MONGO_URL);

  try {
    const db = await mongoose.connect(process.env.MONGO_URL || "", {});
    connection.isconnected = db.connections[0].readyState;
    console.log("database connected succefully");
  } catch (error) {
    console.log(error);
    console.log("database connection failed");
    process.exit(1);
  }
}

export default dbConnect;
