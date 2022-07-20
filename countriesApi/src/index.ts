import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import { router as countriesRouter } from "./countries/route";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/healthcheck", async (req, res) => {
  return res.send("Api is working!!");
});

app.use("/countries", countriesRouter);
app.use((error, req, res, next) => {
  console.log(error);
  return res.status(500).json({ message: "something went wrong" });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Listening to Port:  ${PORT}`);
});
