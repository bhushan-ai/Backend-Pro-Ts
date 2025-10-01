import express, { Request, Response } from "express";

const PORT = 4000;

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("api is working find");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
