import "dotenv/config";
import express, { Request, Response } from "express";
import { dbConnection } from "./services/db";
import userRouter from "./routes/user.route";

const PORT = process.env.PORT || 4000;

const app = express();

//middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Api is working fine");
});

//routes
app.use("/api", userRouter);

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server isn't starting`, err);
  });
