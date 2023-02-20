import { hashPassword } from "../../../lib/auth-util";
import { connectToDatabase } from "../../../lib/db-util";
import noProfileImage from "../../../public/images/no-profile-icon.png";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { name, email, password } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7 ||
      password.includes(" ") ||
      name.trim().length < 2 ||
      name.length > 8 ||
      name.includes(" ")
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    const user = await db.collection("users").findOne({ email: email });

    if (user) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);
    const registerDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    try {
      await db.collection("users").insertOne({
        name: name,
        email: email,
        password: hashedPassword,
        image: noProfileImage,
        registerDate: registerDate,
      });
    } catch (err) {
      res.status(500).json(err.message || "Failed to create user account.");
    }

    res.status(201).json({ message: "Successfully created your account!" });
    client.close();
  } else if (req.method === "GET") {
  }
}

export default handler;
