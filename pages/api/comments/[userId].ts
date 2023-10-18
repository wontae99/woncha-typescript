import type { NextApiRequest, NextApiResponse } from "next";
import type { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

import { connectToDatabase, getAllDocuments } from "@/lib/db-util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  let client: MongoClient;
  try {
    client = await connectToDatabase();
  } catch (err) {
    res.status(500).json({ message: "Failed to connect to database" });
  }

  if (req.method === "GET") {
    try {
      const document = await getAllDocuments(
        client,
        "comments",
        { date: -1 },
        { "user._id": new ObjectId(userId as string) }
      );
      res.status(200).json(document);
    } catch (err) {
      res
        .status(500)
        .json({ message: err.message || "Failed to get comment data" });
    }
  }
}
