import mongoose from "mongoose";

const dbUrl = process.env.MONGODB_URL as string;

export const dbConnection = async (): Promise<void> => {
  try {
    const dbInstance = await mongoose.connect(dbUrl);
    console.log(`mongoDb is connected to host ${dbInstance.connection.host}`);
  } catch (error: any) {
    console.log(`something went wrong while connecting to db`, error);
  }
};
