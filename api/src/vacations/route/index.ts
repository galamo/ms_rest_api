import express from "express";
import getVacationsHandler from "../handlers";
import { sendToQ } from "../handlers/sendToQ";

export const router = express.Router();

router.get("/", getVacations);

async function getVacations(req, res, next) {
  try {
    const result = await getVacationsHandler();
    sendToQ(result);
    return res.json(result);
  } catch (ex) {
    return next(ex);
  }
}
