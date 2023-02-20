import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { connectToDatabase, getAllDocuments } from "../../../lib/db-util";
import { ObjectId } from "mongodb";

import Profile from "../../../components/profile-page/profile";

function UserProfilePage({ user }) {
  const router = useRouter();

  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (!(session || loading)) {
      router.push("/");
    }
  }, [session, loading]);

  return <Profile data={user} type={"user"} />;
}

export default UserProfilePage;

export async function getStaticPaths() {
  const client = await connectToDatabase();
  const users = await getAllDocuments(client, "users", { _id: -1 }, {});

  return {
    fallback: false,
    paths: users.map((user) => ({
      params: { userId: user._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const userId = context.params.userId;

  let client, signedUser;
  try {
    client = await connectToDatabase();
    signedUser = await client
      .db()
      .collection("users")
      .findOne({ _id: ObjectId(userId) });
  } catch (err) {
    console.log(err);
  }
  client.close();

  return {
    props: {
      user: {
        id: signedUser._id.toString(),
        name: signedUser.name,
        email: signedUser.email,
        image: signedUser.image,
        registerDate: signedUser.registerDate,
        wishList: signedUser.wishList
          ? JSON.parse(JSON.stringify(signedUser.wishList))
          : [],
        comment: signedUser.comment
          ? JSON.parse(JSON.stringify(signedUser.comment))
          : [],
      },
    },
  };
}
