import { ObjectId } from "mongodb";

import {
  connectToDatabase,
  findDocument,
  getAllDocuments,
  insertDocument,
} from "@/lib/db-util";

export default async function handler(req, res) {
  const { slug } = req.query;
  const [content, contentId, userId] = slug;

  let client;
  try {
    client = await connectToDatabase();
  } catch (err) {
    res.status(500).json({ message: "Failed to connect to database" });
  }

  if (req.method === "GET") {
    let document;
    if (!userId || userId === "undefined") {
      try {
        document = await getAllDocuments(
          client,
          "comments",
          { _id: -1 },
          { content: { content, contentId } }
        );
        res.status(200).json(document);
      } catch (err) {
        res
          .status(500)
          .json({ message: err.message || "Failed to get comment data" });
      }
    } else {
      try {
        document = await client
          .db()
          .collection("comments")
          .find({
            "user._id": ObjectId(userId),
            content: { content, contentId },
          })
          .toArray();
        res.status(200).json(document);
      } catch (err) {
        res
          .status(500)
          .json({ message: err.message || "Failed to get comment data" });
        return;
      }
    }
  } else if (req.method === "POST") {
    const { comment, date } = req.body;

    const existingComment = await findDocument(client, "comments", {
      content: { content, contentId },
      "user._id": ObjectId(userId),
    });

    if (existingComment) {
      res
        .status(400)
        .json({ message: "You've already registered your comment" });
      client.close();
      return;
    }

    if (!comment.rating) {
      res.status(422).json({ message: "You must choose rating." });
      return;
    }

    const userDoc = await findDocument(client, "users", {
      _id: new ObjectId(userId),
    });

    const newComment = {
      user: userDoc,
      comment,
      date,
      content: {
        content,
        contentId,
      },
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;

      await client
        .db()
        .collection("users")
        .updateOne(
          { _id: ObjectId(userId) },
          { $push: { comment: result.insertedId } },
          { upsert: true }
        );
      res.status(201).json({ message: "New Comment added successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: err || "Failed to upload a new comment" });
      return;
    }
    client.close();
  } else if (req.method === "PATCH") {
    const { comment, date } = req.body;

    if (!comment.rating) {
      res.status(422).json({ message: "You must choose rating." });
      return;
    }

    try {
      await client
        .db()
        .collection("comments")
        .updateOne(
          {
            "user._id": ObjectId(userId),
            content: { content, contentId },
          },
          { $set: { comment, date, edited: true } },
          { upsert: true }
        );
      res
        .status(201)
        .json({ message: "Comment has been updated successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: err.message || "Failed to update a comment" });
      return;
    }
    client.close();
  } else if (req.method === "DELETE") {
    let response;
    try {
      response = await client
        .db()
        .collection("comments")
        .findOneAndDelete({
          "user._id": ObjectId(userId),
          content: { content, contentId },
        });

      await client
        .db()
        .collection("users")
        .updateOne(
          { _id: ObjectId(userId) },
          { $pull: { comment: response.value._id } }
        );
      res.status(201).json({ message: "Successfully deleted your comment." });
    } catch (err) {
      res
        .status(500)
        .json({ message: err.message } || "Failed to delete comment.");
    }
    client.close();
  }
}
