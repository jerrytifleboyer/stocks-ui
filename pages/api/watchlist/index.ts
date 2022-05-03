import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../backend/connectDB";
import StockModel from "../../../models/StockModel";
import checkIfWeekend from "../../../backend/checkIfWeekend";
connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { isWeekend, toLastFriday, todaysDate } = checkIfWeekend();
  let setWeekday: string = toLastFriday.toDateString();
  isWeekend ? setWeekday : (setWeekday = todaysDate);
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const getData = await StockModel.find({
          date: setWeekday,
        });
        res.status(200).json(getData);
      } catch {
        res.status(400).json({ error: "unable to get data" });
      }
      break;
  }
};
