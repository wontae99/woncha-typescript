import { hashPassword } from "../../../lib/auth-util";
import { connectToDatabase } from "../../../lib/db-util";
import noProfileImage from "../../../public/images/no-profile-icon.png";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { name, email, password } = data;
    console.log(name, email, password);
    // client-side validation
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7 ||
      password.includes(" ") ||
      name.trim().length < 2 ||
      name.includes(" ")
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    const checkExistingEmail = !!(await db
      .collection("users")
      .findOne({ email: email }));

    if (checkExistingEmail) {
      client.close();
      // throw new Error("Email Already exists!");
      res
        .status(400)
        .json({
          status: 400,
          ok: false,
          message: `Email address "${email}" already exists!`,
        });
      return;
    }

    const checkExistingUser = !!(await db
      .collection("users")
      .findOne({ name: name }));
    if (checkExistingUser) {
      client.close();
      res.status(400).json({
        status: 400,
        ok: false,
        message: `Username: ${name} already exists!`,
      });
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
      console.log(err);
      // throw new Error("Failed to create a new account.");
      return res
        .status(500)
        .json(err.message || "Failed to create user account.");
    }

    res.status(201).json({ message: "Successfully created your account!" });
    client.close();
  } else if (req.method === "GET") {
  }
}

export default handler;
