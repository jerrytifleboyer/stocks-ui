import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../backend/connectDB";
import NotesModel from "../../../models/NotesModel";
import checkIfWeekend from "../../../backend/checkIfWeekend";
connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { isWeekend, toLastFriday, todaysDate } = checkIfWeekend();
  let setWeekday: string = toLastFriday.toDateString();
  isWeekend ? setWeekday : (setWeekday = todaysDate);

  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const getData = await NotesModel.find({
          date: "Fri Apr 08 2022",
        });
        res.status(200).json(getData);
      } catch {
        res.status(400).json({ error: "unable to get data" });
      }
      break;
    case "POST":
      try {
        const note = await NotesModel.create(body);
        res.status(201).json(note);
      } catch {
        res.status(400).json({ error: "unable to update data" });
      }
  }
};
