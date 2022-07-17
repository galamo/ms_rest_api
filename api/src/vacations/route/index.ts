import express from "express";
import getVacationsHandler from "../handlers";

export const router = express.Router();

router.get("/", getVacations);

async function getVacations(req, res, next) {
  try {
    const result = await getVacationsHandler();
    return res.json(result);
  } catch (ex) {
    return next(ex);
  }
}
