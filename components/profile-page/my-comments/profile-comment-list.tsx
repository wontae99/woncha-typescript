import { Fragment, useState } from "react";

import CommentHistory from "./comment-history";
import BackButton from "../../ui/back-button";
import Pagination from "@mui/material/Pagination";

export default function ProfileCommentList({ commentData }) {
  const totalPageNum = Math.ceil(commentData.length / 5);
  const isDisabled = totalPageNum === 1;

  const [currentPage, setCurrentPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Fragment>
      <div className="sticky top-0 sm:top-16 flex justify-between bg-white dark:bg-slate-900 z-20 w-full border-t border-b dark:border-slate-400 px-4 py-3">
        <h2 className="text-xl font-bold dark:text-white">My Comments</h2>
        <div className="">
          <BackButton />
        </div>
      </div>
      <div className="flex flex-col justify-center relative w-full container py-2 mx-auto md:w-3/4 md:py-5 px-2">
        <CommentHistory
          commentData={commentData}
          currentPage={currentPage}
          totalPageNum={totalPageNum}
        />
        <div className="py-8 mx-auto">
          <Pagination
            count={totalPageNum}
            color="secondary"
            page={currentPage}
            disabled={isDisabled}
            onChange={handleChange}
            className="bg-slate-200 p-0.5 rounded-full"
          />
        </div>
      </div>
    </Fragment>
  );
}
