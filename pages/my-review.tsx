import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { useAppDispatch } from "@/components/hooks/redux-hooks";
import { uiActions } from "@/store/ui-slice";

import MyReview from "@/components/user/my-review";
import AuthFallback from "@/components/layout/auth-fallback";
import PageLoader from "@/components/ui/page-loader";

export default function MyReviewPage() {
  // const commentData = JSON.parse(comments);
  const dispatch = useAppDispatch();
  const [reviews, setReviews] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) return;

    const userId = session?.user.id;
    fetch(`/api/comments/${userId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => {
        console.log(err);
        dispatch(
          uiActions.showNotification({ message: "Failed to load data." })
        );
      });
  }, []);

  if (!reviews) return <PageLoader />;
  else
    return status === "unauthenticated" ? (
      <AuthFallback />
    ) : (
      <MyReview commentData={reviews} />
    );
}

// export async function getStaticProps(context: GetServerSidePropsContext) {
//   const userId = context.params.userId as string;

//   const client = await connectToDatabase();
//   const document = await getAllDocuments(
//     client,
//     "comments",
//     { date: -1 },
//     { "user._id": new ObjectId(userId) }
//   );

//   return {
//     props: {
//       comments: JSON.stringify(document),
//     },
//   };
// }
