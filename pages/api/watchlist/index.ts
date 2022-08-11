import type { NextApiRequest, NextApiResponse } from "next";
import { StockModel } from "../../../models/Stock";
import { UserModel } from "../../../models/User";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const getData = await UserModel.findOne(
          {
            email: session!.user!.email,
          },
          { _id: 1 }
        ).populate({ path: "watchlist", model: "stock" });
        res.status(200).json(getData.watchlist);
      } catch (error) {
        // console.log(error);
        res.status(400).json({ error: "unable to get data" });
      }
      break;
    //the user can add a note, the note is added by ObjectIDs
    case "POST":
      try {
        const stock = await StockModel.findOne(
          { ticker: body.ticker },
          { _id: 1 }
        );
        if (stock) {
          const updateData = await UserModel.updateOne(
            { email: session!.user!.email },
            {
              $push: {
                watchlist: stock._id,
              },
            }
          );
          res.status(200).json(updateData);
        } else {
          res.status(400).json({
            error: "we dont support that stock, maybe you can suggest it",
          });
        }
      } catch {
        res.status(400).json({ error: "unable to update" });
      }
      break;
    default:
      res.status(400).json({ error: "request not supported" });
      break;
  }
};
