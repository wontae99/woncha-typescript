import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";

import { PencilIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Comment } from "../../lib/types";

interface CommentListItemProps {
  comment: Comment;
  isMine?: boolean;
  onShowForm?: () => {};
  onDelete?: () => {};
}

const CommentListItem: React.FC<CommentListItemProps> = ({
  comment,
  isMine,
  onShowForm,
  onDelete,
}) => {
  const time = new Date();
  const [currentTime, setCurrentTime] = useState(time);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  let timeDiff: number;
  let writtenTime = new Date(comment.date);

  timeDiff = Math.floor((currentTime.valueOf() - writtenTime.valueOf()) / 1000); // 단위: 초(second)

  if (timeDiff < 60) {
    comment.timeDiff = `just a moment ago`;
  } else if (timeDiff < 60 * 60) {
    comment.timeDiff = `${Math.floor(timeDiff / 60)} min(s) ago`;
  } else if (timeDiff < 60 * 60 * 24) {
    comment.timeDiff = `${Math.floor(timeDiff / (60 * 60))} h(s) ago`;
  } else if (timeDiff < 60 * 60 * 24 * 7) {
    comment.timeDiff = `${Math.floor(timeDiff / (60 * 60 * 24))} day(s) ago`;
  } else {
    comment.timeDiff = writtenTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }

  return (
    <li
      key={comment._id}
      className="flex flex-col py-4 w-full justify-between p-2 md:p-4"
    >
      <div className="flex justify-between w-full">
        <Link
          className="flex group rounded-lg p-1 hover:bg-slate-200"
          href={`/user/${comment.user._id}`}
        >
          <Image
            src={comment.user.image}
            className="bg-white rounded-full h-12 w-12 m-auto"
            alt=""
            loading="lazy"
            width={45}
            height={45}
            quality={100}
          ></Image>
          <div className="flex flex-col md:flex-row space-x-1">
            <div className="text-lg font-semibold text-slate-900 mx-2 dark:text-slate-50 dark:group-hover:text-slate-800 group-hover:underline">
              {comment.user.name}
            </div>

            <div className="rounded-full bg-white w-fit h-fit px-2 mt-1 dark:bg-slate-800 dark:text-white">
              <i className="fa-solid fa-star text-yellow-300 pr-1"></i>
              {comment.comment.rating}
            </div>
          </div>
        </Link>
        <div className="flex flex-col justify-between justify-end text-end">
          <p className="text-slate-500 text-sm dark:text-slate-300 mb-2">
            {comment.edited ? "(edited)" : ""} {comment.timeDiff}
          </p>
          {isMine && (
            <div className="flex flex-row gap-3 text-sm justify-end">
              <button
                className="w-fit flex flex-row my-auto dark:text-white gap-1"
                onClick={onShowForm}
              >
                <PencilIcon width={18} /> Edit
              </button>
              <button
                className="w-fit flex flex-row my-auto dark:text-white gap-1"
                onClick={onDelete}
              >
                <XCircleIcon width={18} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-start text-md pt-4 dark:text-slate-200">
        {comment.comment.text}
      </p>
    </li>
  );
};

export default memo(CommentListItem);
