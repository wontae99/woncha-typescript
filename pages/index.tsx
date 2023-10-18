import { GetStaticProps, InferGetStaticPropsType } from "next";

import { getTopRatedContents, getTrendingContents } from "@/lib/movie-data";

import ContentGrid from "@/components/contents/content-grid";
export default function Home({
  movies,
  tvShows,
}: InferGetStaticPropsType<GetStaticProps>) {

  return (
    <main className="last:pb-10">
      <ContentGrid contents={movies.trending} heading={"Trending Movies"} />
      <ContentGrid contents={tvShows.trending} heading={"Trending TV Shows"} />
      <ContentGrid contents={movies.topRated} heading={"Top Rated Movies"} />
      <ContentGrid contents={tvShows.topRated} heading={"Top Rated TV Shows"} />
    </main>
  );
}

export async function getStaticProps() {
  const trendingMovies = await getTrendingContents("movie");
  const trendingTvShows = await getTrendingContents("tv");
  const topRatedMovies = await getTopRatedContents("movie");
  const topRatedTvShows = await getTopRatedContents("tv");

  return {
    props: {
      movies: { trending: trendingMovies, topRated: topRatedMovies },
      tvShows: { trending: trendingTvShows, topRated: topRatedTvShows },
    },
  };
}
