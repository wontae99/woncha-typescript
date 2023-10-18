import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Card from "./card";

import { useAppSelector } from "../hooks/redux-hooks";

const MyList = ({ watchList }) => {
  const searchParams = useSearchParams();
  const selectedType = searchParams.get("type") || "all";

  // type 필터 버튼
  const TButton = ({ title }: { title: "all" | "movie" | "tv" }) => {
    const isCurrent = selectedType === title;
    return (
      <Link
        href={{ pathname: `/my-list`, query: { type: title } }}
        className={
          "text-lg transition-all hover:drop-shadow-lg rounded-2xl px-2 py-1 border-[2px] border-pink-500 text-black dark:text-white hover:bg-pink-500" +
          (isCurrent ? " bg-pink-500" : "")
        }
        scroll={false}
      >
        {title.toUpperCase()}
      </Link>
    );
  };

  return (
    <section className="w-full h-full min-h-screen p-4 md:p-8">
      <div>
        <h1 className="font-bold text-3xl">My List</h1>
      </div>

      <div className="flex space-x-2 py-4">
        <TButton title="all" />
        <TButton title="tv" />
        <TButton title="movie" />
      </div>

      {watchList.length === 0 ? (
        <p>There's no content in your list.</p>
      ) : (
        <div className="w-full grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 place-content-evenly overflow-hidden">
          {watchList
            .filter((item) => {
              if (selectedType === "all") {
                return item;
              }
              return item.type === selectedType.toLowerCase();
            })
            .map((item) => (
              <div
                className="text-white relative w-full h-full md:w-48 md:h-72 p-2"
                key={item.type + item.id}
              >
                <Card item={item} />
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default MyList;
