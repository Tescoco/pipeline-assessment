import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import rateLimit from "express-rate-limit";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4001;

//Middle Ware
const limiter = rateLimit({
  windowMs: 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Rate exceeded",
});

type RequestQuery = Request<{}, {}, {}, { dob: string }>;

app.use(limiter).get("/howold", async (req: RequestQuery, res: Response) => {
  //destructures dob form query
  const { dob } = req.query;

  const dobDate = new Date(dob);
  const currentDate = new Date();
  const dobMs = dobDate.getTime(); //date of birth in milliseconds

  const currentDateMs = currentDate.getTime();
  const oneYearMs = 31536000000; //Milliseconds of One Year
  const oneMonthMs = 2592000000; //Milliseconds of One Month

  //Get difference
  const ageMs = currentDateMs - dobMs;

  //If dob is undefined
  if (!dob) {
    return res.status(400).json({ error: "date of birth is required" });
  }

  //Check if dobMs is a number or if date of birth is greater than current year
  if (Number.isNaN(dobMs) || dobDate > currentDate) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  // If age is less than a month
  if (ageMs <= oneMonthMs) {
    let age = Math.round(ageMs / (1000 * 60 * 60 * 24));
    return res.status(200).json({ age: `${age} day(s)` });
  }
  // If age is less than a year
  else if (ageMs <= oneYearMs) {
    let age = Math.round(ageMs / (1000 * 60 * 60 * 24 * 30));
    return res.status(200).json({ age: `${age} month(s)` });
  }
  // Then age is more than 12 months
  else {
    let age = Math.round(ageMs / (1000 * 60 * 60 * 24 * 365));
    return res.status(200).json({ age: `${age} year(s)` });
  }
});

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json("Route: /howold?dob=MM-DD-YYYY");
});

app.listen(port, () => {
  console.log(`And we have takeoff! [Port]: ${port}`);
});
