import { Fragment } from "react";

import ReviewHistory from "./review-history";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function MyReview({ commentData }) {
  const router = useRouter();
  const session = useSession();

  const totalPageNum = Math.ceil(commentData.length / 5);
  const isDisabled = totalPageNum === 1;

  const searchParams = useSearchParams();
  const selectedPage = searchParams.get("page") || 1;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/${session.data.user.id}/my-review?page=${value}`);
  };

  return (
    <section className="w-full min-h-screen">
      <h1
        className={`font-black text-3xl w-full p-4 top-0 bg-white dark:bg-[#171717]`}
      >
        My Reviews
      </h1>

      <div className="flex flex-col justify-center relative w-full container py-2 mx-auto md:w-3/4 md:py-5 px-2">
        <ReviewHistory
          commentData={commentData}
          currentPage={selectedPage}
          totalPageNum={totalPageNum}
        />
        <div className="py-8 mx-auto">
          <Pagination
            count={totalPageNum}
            color="secondary"
            page={+selectedPage}
            disabled={isDisabled}
            onChange={handleChange}
            className="bg-slate-200 dark:bg-gray-700 p-0.5 rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
