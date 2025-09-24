import mongoose from "mongoose";

const mongo_url = process.env.MONGODB_URL as string;

export const dbConnection = async (): Promise<void> => {
  try {
    const dbInstance = await mongoose.connect(mongo_url);
    console.log(`Db connected to host ${dbInstance.connection.host}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while  connecting to Db`, err);
  }
};
