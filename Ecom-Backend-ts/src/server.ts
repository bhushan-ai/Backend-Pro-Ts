import "dotenv/config";
import express, { Request, Response } from "express";

const PORT = 4000;
const app = express();

//routes
app.get("/", (req: Request, res: Response) => {
  res.send("Api is running fine");
});

app.listen(PORT, () => {
  console.log(`Server is started on http://localhost:${PORT}`);
});
