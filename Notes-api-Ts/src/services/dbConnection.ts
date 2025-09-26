import mongoose, { connection } from "mongoose";

const db = process.env.MONGODB_URL as string;

export const dbConnection = async (): Promise<void> => {
  try {
    const dbInstance = await mongoose.connect(db);
    console.log(`Db connected to host: ${dbInstance.connection.host}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`MongoDb connection error`, err);
  }
};
