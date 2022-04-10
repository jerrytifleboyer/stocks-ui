import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../backend/connectDB";
import StockModel from "../../models/StockModel";
import { useState } from "react";
connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [date, setDate] = useState("Fri Apr 08 2022");
  const dateTime = new Date();
  const today = dateTime.getDay();
  const saturday = 6;
  const sunday = 0;
  const isWeekend = today === saturday || today === sunday;
  isWeekend ? date : setDate(dateTime.toDateString());
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const getData = await StockModel.find({
          date: date,
        });
        res.status(200).json(getData);
      } catch {
        res.status(400).json({ error: "unable to get data" });
      }
      break;
  }
};
