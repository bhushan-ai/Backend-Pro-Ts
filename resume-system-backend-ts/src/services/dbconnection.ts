import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL as string;

export const dbConnection = async (): Promise<void> => {
  try {
    const dbInstance = await mongoose.connect(mongoUrl);
    console.log(
      `Db connected to host ${dbInstance.connection.host} successfully!!`
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Something went wrong while connecting to db`, err);
  }
};
