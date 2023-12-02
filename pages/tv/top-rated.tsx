import React from "react";

import ContentCard from "@/components/contents/ContentCard";
import LoadMore from "@/components/ui/LoadMore";

import { getTopRatedContents } from "@/lib/movie-data";
import { ContentData } from "@/lib/types";

export async function getStaticProps() {
  const topRatedTvShows = await getTopRatedContents("tv");

  return {
    props: {
      data: topRatedTvShows,
    },
    revalidate: 60,
  };
}

const TopRatedTVPage = ({ data }) => {
  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl font-bold capitalize text-black dark:text-slate-50 text-center sm:text-start">
        Top Rated TV shows
      </h2>
      <section className="content-card-grid">
        {data.map((content: ContentData, index) => (
          <ContentCard
            key={content.id}
            content={content}
            contentType="tv"
            index={index}
          />
        ))}
      </section>
      <LoadMore contentType="tv" option="top-rated" />
    </main>
  );
};

export default TopRatedTVPage;
