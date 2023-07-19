import { Fragment } from "react";
import { useAppSelector } from "@/components/hooks/redux-hooks";

import ContentGrid from "@/components/contents/content-grid";

export default function AllMoviesPage() {
  const contentData = useAppSelector((state) => state.content.contents);
  const { movies } = contentData;

  return (
    <Fragment>
      <div className="pb-10">
        <ContentGrid contents={movies.trending} heading={"Trending Movies"} />
        <ContentGrid contents={movies.topRated} heading={"Top Rated Movies"} />
      </div>
    </Fragment>
  );
}

// export async function getServerSideProps() {
//   const trendingMovies = await getTrendingContents("movie");
//   const topRatedMovies = await getTopRatedContents("movie");

//   return {
//     props: {
//       movies: { trending: trendingMovies, topRated: topRatedMovies },
//     },
//   };
// }
