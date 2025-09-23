import "dotenv/config";
import express, { Request, Response } from "express";

const PORT = process.env.PORT || 4000;

const app = express();

//middleware
app.get("/", (req: Request, res: Response) => {
  res.send("Api is working fine");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
