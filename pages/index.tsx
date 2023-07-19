import { Fragment } from "react";
import { getTopRatedContents, getTrendingContents } from "../lib/movie-data";

import ContentGrid from "../components/contents/content-grid";

export default function Home(props) {
  const { movies, tvShows } = props;
  // const data = useSelector((state) => state.content.contents);
  // console.log(data);

  return (
    <Fragment>
      <div className="last:pb-10">
        <ContentGrid contents={movies.trending} heading={"Trending Movies"} />
        <ContentGrid
          contents={tvShows.trending}
          heading={"Trending TV Shows"}
        />
        <ContentGrid contents={movies.topRated} heading={"Top Rated Movies"} />
        <ContentGrid
          contents={tvShows.topRated}
          heading={"Top Rated TV Shows"}
        />
      </div>
    </Fragment>
  );
}

export async function getServerSideProps() {
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
