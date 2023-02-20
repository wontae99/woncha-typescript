import Link from "next/link";
import { useEffect, useState } from "react";
import { getDataWithId } from "../../../lib/movie-data";

import { FilmIcon } from "@heroicons/react/20/solid";
import { TvIcon } from "@heroicons/react/20/solid";

export default function CommentListItem({ date, content, comment }) {
  const [title, setTitle] = useState("loading...");
  const dmy = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  useEffect(() => {
    getDataWithId(content.content, content.contentId).then((res) => {
      setTitle(res.title || res.name);
    });
  }, []);

  return (
    <li className="mb-10 ml-4 last:mb-0">
      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {dmy}
      </time>
      <div>
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Rating star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
            {comment.rating}
          </p>
          <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
          <div className="text-lg font-semibold text-gray-900 dark:text-white hover:text-pink-600">
            <Link
              className="flex space-x-1 items-center"
              href={`/content/${content.content}/${content.contentId}/`}
            >
              <h3>{title}</h3>
              {content.content === "movie" ? (
                <FilmIcon className="w-6 h-6" />
              ) : (
                <TvIcon className="w-6 h-6" />
              )}
            </Link>
          </div>
        </div>
      </div>

      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {comment.text}
      </p>
    </li>
  );
}
