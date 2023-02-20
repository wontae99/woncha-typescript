import { useSession } from "next-auth/react";
import { memo } from "react";
import CommentListItem from "./comment-list-item";

function CommentList({ comments }) {
  const { data: session } = useSession();
  const userId = session?.user.id;

  return (
    <ul
      role="list"
      className="my-4 mx-auto divide-y bg-slate-100 dark:bg-slate-600 rounded-lg divide-slate-300 w-full lg:w-3/4"
    >
      {comments
        .filter((comment) => comment.user._id !== userId)
        .map((comment) => (
          <CommentListItem key={comment._id} comment={comment} />
        ))}
    </ul>
  );
}

export default memo(CommentList);
