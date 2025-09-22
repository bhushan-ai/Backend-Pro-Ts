import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL as string;

export const dbConnection = async (): Promise<void> => {
  try {
    const dbInstance = await mongoose.connect(MONGODB_URL);
    console.log(`Database connected to host ${dbInstance.connection.host}`);
  } catch (error: any) {
    const err = error as Error;
    console.log(`something is went wrong while connecting to db`, err);
  }
};
