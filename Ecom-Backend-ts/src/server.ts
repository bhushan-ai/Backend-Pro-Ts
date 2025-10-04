import "dotenv/config";
import express, { Request, Response } from "express";
import { dbConnection } from "./services/dbConnection";

const PORT = 4000;
const app = express();

//routes
app.get("/", (req: Request, res: Response) => {
  res.send("Api is running fine");
});

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is started on http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => {
    console.log(`Something went wrong while starting the server`, err);
  });
