import axios from "axios";
import express from "express";

export const router = express.Router();

router.get("/", getCountries);
let countries: Array<any> = [];
async function getCountries(req, res, next) {
  let current = new Date().getTime();
  try {
    if (Array.isArray(countries) && countries.length) {
      return res.json(countries);
    } else {
      const result = await axios.get(process.env.COUNTRIES_API);
      const { data } = result;
      countries = data;
      res.json(data);
    }
  } catch (ex) {
    return next(ex);
  } finally {
    console.log(new Date().getTime() - current);
  }
}
