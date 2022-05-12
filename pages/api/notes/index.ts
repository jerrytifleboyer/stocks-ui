import type { NextApiRequest, NextApiResponse } from "next";
import StockModel from "../../../models/StockModel";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const getData = await StockModel.find({
          $or: [{ priceTarget: { $ne: "" } }, { notes: { $ne: "" } }],
        });
        res.status(200).json(getData);
      } catch {
        res.status(400).json({ error: "unable to get notes" });
      }
      break;
    case "PATCH":
      try {
        const updateData = await StockModel.updateOne(
          { ticker: body.ticker },
          { $set: body }
        );
        res.status(200).json(updateData);
      } catch {
        res.status(500).json({ error: "unable to update notes" });
      }
      break;
  }
};
