import type { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../../models/User";
import { getSession } from "next-auth/react";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const session = await getSession({ req });
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const getUserNotes = await UserModel.findOne(
          {
            email: session.user.email,
          },
          { notes: 1 }
        );
        res.status(200).json(getUserNotes.notes);
      } catch (error) {
        // console.log(error);
        res.status(400).json({ error: "could not find your notes" });
      }
      break;
    case "POST":
      try {
        const tickerExists = await UserModel.findOne({
          email: session.user.email,
          "notes.ticker": body.ticker,
        });
        if (!tickerExists) {
          const updateData = await UserModel.updateOne(
            { email: session.user.email },
            {
              $push: {
                notes: body,
              },
            }
          );
          res.status(200).json(updateData);
        } else {
          res
            .status(400)
            .json({ error: "you already have this note in your list" });
        }
      } catch {
        res.status(400).json({ error: "unable to update notes" });
      }
      break;
  }
  // }
};
