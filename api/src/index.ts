import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import { initDB } from "./db";
import router from "./login/route";
import { router as vacationsRouter } from "./vacations/route";

initDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/healthcheck", async (req, res) => {
  return res.send("Api is working!!");
});

app.use("/login", router);
app.use("/vacations", vacationsRouter);

app.use((error, req, res, next) => {
  // console.log(error);
  return res.status(500).json({ message: "something went wrong" });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Listening to Port: ${PORT}`);
});
