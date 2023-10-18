import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";

import { verifyPassword } from "@/lib/auth-util";
import { connectToDatabase } from "@/lib/db-util";

export const authOptions = {
  trustHost: true,
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token.sub;
      session.user.image = token.picture;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          // store.dispatch(
          //   uiActions.showNotification({
          //     message: "User not found with your input email.",
          //   })
          // );
          throw new Error("User not found with your input email.");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          // store.dispatch(
          //   uiActions.showNotification({
          //     message: "Incorrect password. Please check your password input.",
          //   })
          // );
          throw new Error(
            "Incorrect password. Please check your password input."
          );
        }

        client.close();
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image || null,
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.kakao_id,
      clientSecret: process.env.kakao_secret,
      async profile(profile) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const registerDate = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });

        const userData = {
          name: profile.kakao_account?.profile.nickname,
          email: profile.kakao_account?.email,
          image: profile.kakao_account?.profile.profile_image_url,
          age: profile.kakao_account?.age_range,
          registerDate,
        };

        const user = await usersCollection.findOne({
          email: userData.email,
        });

        if (!user) {
          await usersCollection.insertOne(userData);
        } else {
          console.log(
            "You have an account with an email you provided. Please check your account"
          );
        }

        userData.id = user._id;
        client.close();

        return userData;
      },
    }),
    GoogleProvider({
      clientId: process.env.google_clientId,
      clientSecret: process.env.google_clientSecret,
      async profile(profile) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const registerDate = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });

        const userData = {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          registerDate,
        };

        const user = await usersCollection.findOne({
          email: userData.email,
        });

        if (!user) {
          await usersCollection.insertOne(userData);
        } else {
          console.log(
            "You have an account with an email you provided. Please check your account"
          );
        }

        userData.id = user._id;
        client.close();

        return userData;
      },
    }),
  ],
};

export default NextAuth(authOptions);
