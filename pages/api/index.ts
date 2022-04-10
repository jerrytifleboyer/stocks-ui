import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../backend/connectDB";
import StockModel from "../../models/StockModel";
import { useState } from "react";
connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const dateTime = new Date();
  const today = dateTime.getDay();
  const saturday = 6;
  const sunday = 0;
  const isWeekend = today === saturday || today === sunday;
  let setWeekday = "Fri Apr 08 2022";
  isWeekend ? setWeekday : (setWeekday = dateTime.toDateString());
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
