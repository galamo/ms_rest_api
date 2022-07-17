import axios from "axios";
import express from "express";
import getVacationsHandler from "../handlers";

export const router = express.Router();

router.get("/", getVacations);

async function getVacations(req, res, next) {
  try {
    const result = await getVacationsHandler();
    const { data } = await getCountriesApi();
    // const flights = await getFlights()
    Promise.allSettled([getVacationsHandler(), getCountriesApi()]).then(
      (res) => {
        console.log("==============================");
        console.log("==============================");
        console.log("==============================");
        console.log(res[0]);
        console.log(res[1]);
      }
    );
    const finalResult = result.reduce((acc, current) => {
      const { country } = current;
      const countryToLower = country.toLowerCase();
      const foundCountry = data.find(
        (c) => c.cca2.toLowerCase() === countryToLower
      );
      if (foundCountry) {
        return [...acc, { ...current, flag: foundCountry.flags?.png }];
      } else {
        return [...acc, current];
      }
    }, []);
    return res.json(finalResult);
  } catch (ex) {
    return next(ex);
  }
}

async function getCountriesApi() {
  return await axios.get(process.env.COUNTRIES_API_MS);
}
