import "dotenv/config";
import express, { Request, Response } from "express";
import { dbConnection } from "./services/dbConnection";
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth-user/user.route";
import productRouter from "./routes/admin/product.route";
import shopProducts from "./routes/user/allProducts.route";
import wishlistProducts from "./routes/user/user.wishlist.route";

const PORT = 4000;
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req: Request, res: Response) => {
  res.send("Api is running fine");
});

app.use("/api/user", userRouter);
//admin
app.use("/api/product", productRouter);
//user
app.use("/api/products", shopProducts);
//user wishlist
app.use("/api/wishlist", wishlistProducts);

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is started on http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => {
    console.log(`Something went wrong while starting the server`, err);
  });
