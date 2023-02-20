import { ObjectId } from "mongodb";
import ProfileCommentList from "../../../../components/profile-page/my-comments/profile-comment-list";
import { connectToDatabase, getAllDocuments } from "../../../../lib/db-util";

export default function ProfileComments({ comments }) {
  const commentData = JSON.parse(comments);
  return <ProfileCommentList commentData={commentData} />;
}

export async function getServerSideProps(context) {
  const userId = context.params.userId;

  const client = await connectToDatabase();
  const document = await getAllDocuments(
    client,
    "comments",
    { date: -1 },
    { "user._id": ObjectId(userId) }
  );

  return {
    props: {
      comments: JSON.stringify(document),
    },
  };
}
