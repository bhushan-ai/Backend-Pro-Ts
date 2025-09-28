import "dotenv/config";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import { dbConnection } from "./services/dbConnection";
import noteRouter from "./routes/notes.route";
const PORT = process.env.PORT || 4000;

const app = express();
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//routes
app.get("/", (req: Request, res: Response) => {
  res.send("Api is running fine");
});
app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);

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
