// import { useAppSelector } from "@/components/hooks/redux-hooks";

import ContentGrid from "@/components/contents/content-grid";
import { getTrendingContents, getTopRatedContents } from "@/lib/movie-data";

export async function getStaticProps() {
  const trendingMovies = await getTrendingContents("movie");
  const topRatedMovies = await getTopRatedContents("movie");

  return {
    props: {
      movies: { trending: trendingMovies, topRated: topRatedMovies },
    },
    revalidate: 60,
  };
}

export default function AllMoviesPage({ movies }) {
  return (
    <main className="pb-10">
      <ContentGrid contents={movies.trending} heading={"Trending Movies"} />
      <ContentGrid contents={movies.topRated} heading={"Top Rated Movies"} />
    </main>
  );
}
