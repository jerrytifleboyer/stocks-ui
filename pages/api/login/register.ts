import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import db from "../../../models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        await db.create({
          email: body.email,
          password: hashedPassword,
        });
        res.status(201).json({ success: true });
        res.redirect("/login");
      } catch {
        res.status(400).json({ error: "could not create account" });
      }
      break;
  }
};
