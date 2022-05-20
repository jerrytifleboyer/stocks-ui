import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../models/Stock";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const getData = await db.find();
        res.status(200).json(getData);
      } catch {
        res.status(400).json({ error: "unable to get data" });
      }
      break;
    default:
      res.status(400).json({ error: "request not supported" });
      break;
  }
};
