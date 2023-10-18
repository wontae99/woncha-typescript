import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

import { connectToDatabase } from "@/lib/db-util";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  let client: MongoClient;

  try {
    client = await connectToDatabase();
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || "Failed to connect to database." });
  }

  if (req.method === "GET") {
    try {
      const response = await client
        .db()
        .collection("users")
        .findOne({ _id: new ObjectId(userId as string) }, { projection: { wishList: 1 } });
      res.status(200).json(response);
    } catch (err) {
      res
        .status(422)
        .json({ message: err.message || "Failed to fetch wish list." });
    }
  } else if (req.method === "PATCH") {
    const { items } = req.body;
    console.log(items);
    try {
      const response = await client
        .db()
        .collection("users")
        .updateOne(
          { _id: new ObjectId(userId as string) },
          {
            $set: { wishList: items },
          }
        );
      res.status(201).json(response);
    } catch (err) {
      res
        .status(500)
        .json({ message: err.message || "Failed to update wish list" });
    }
    client.close();
  }
}
