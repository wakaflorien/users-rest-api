import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./config/dbConnection";
import users from "./routes/user";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 7000;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Express + TypeScript Server",
  });
});
app.use("/api/v1", users);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
