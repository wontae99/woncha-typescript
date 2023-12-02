import React from "react";

import LoadMore from "@/components/ui/LoadMore";
import ContentCard from "@/components/contents/ContentCard";

import { getTopRatedContents } from "@/lib/movie-data";
import { ContentData } from "@/lib/types";


export async function getStaticProps() {
  const topRatedMovies = await getTopRatedContents("movie");

  return {
    props: {
      data: topRatedMovies,
    },
    revalidate: 60,
  };
}

const TopRatedMoviePage = ({ data }) => {
  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl font-bold capitalize text-black dark:text-slate-50 text-center sm:text-start">
        Top Rated Movies
      </h2>
      <section className="content-card-grid">
        {data.map((content: ContentData, index) => (
          <ContentCard
            key={content.id}
            content={content}
            contentType="movie"
            index={index}
          />
        ))}
      </section>
      <LoadMore contentType="movie" option="top-rated" />
    </main>
  );
};

export default TopRatedMoviePage;
