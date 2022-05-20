import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../models/Stock";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const getData = await db.find({
          $or: [{ priceTarget: { $ne: "" } }, { notes: { $ne: "" } }],
        });
        res.status(200).json(getData);
      } catch {
        res.status(400).json({ error: "unable to get notes" });
      }
      break;
    case "PATCH":
      try {
        const updateData = await db.updateOne(
          { ticker: body.ticker },
          { $set: body }
        );
        res.status(200).json(updateData);
      } catch {
        res.status(400).json({ error: "unable to update notes" });
      }
      break;
  }
};
