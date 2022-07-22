import type { NextApiRequest, NextApiResponse } from "next";
import { StockModel } from "../../../models/Stock";
import { TestModel } from "../../../models/Test";
import { UserModel } from "../../../models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const getData = await StockModel.find();
        res.status(200).json(getData);
      } catch {
        res.status(400).json({ error: "unable to get data" });
      }
      break;
    default:
      res.status(400).json({ error: "request not supported" });
      break;
    case "POST":
      try {
        const stock = await TestModel.findOne({ ticker: body.ticker });
        if (stock._id) {
          const updateData = await UserModel.updateOne(
            { email: "qwe@gmail.com" },
            {
              $push: {
                watchlist: stock._id,
              },
            }
          );
          res.status(200).json(updateData);
        } else {
          res.status(400).json({ error: "could not add to watchlist" });
        }
      } catch {
        res.status(400).json({ error: "unable to update" });
      }
  }
};
