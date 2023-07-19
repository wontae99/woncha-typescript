import { useSession } from "next-auth/react";
import React, { memo } from "react";

import CommentListItem from "./comment-list-item";

import { CommentList as CommentListType } from "../../lib/types";

interface CommentListProps {
  comments: CommentListType;
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
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
};

export default memo(CommentList);
