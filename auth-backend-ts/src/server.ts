import "dotenv/config";
import express, { Request, Response } from "express";
import userRouter from "./routes/user.routes";
import { dbConnection } from "./services/dbConnection";
const PORT = process.env.PORT || 4000;

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("api started");
});

app.use(express.json());

app.use("/api", userRouter);

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on http://localhost:${PORT}`);
    });
  })
  .catch((error: any) => {
    console.log(`server is not started`, error);
  });
