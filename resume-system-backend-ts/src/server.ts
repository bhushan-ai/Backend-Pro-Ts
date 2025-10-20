import "dotenv/config";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./services/dbconnection";
import userRouter from "./routes/user.route";
import resumeRouter from "./routes/resume.route";
const PORT = process.env.PORT || 4000;

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.get("/", (req: Request, res: Response) => {
  res.send("Api is running fine");
});

//routes
app.use("/api/user", userRouter);
app.use("/resume", resumeRouter);

//Db connection
dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is started on http://localhost:${PORT}`);
    });
  })
  .catch((error: unknown) => {
    const err = error as Error;
    console.log(`Server is not started on http://localhost:${PORT}`, err);
  });
