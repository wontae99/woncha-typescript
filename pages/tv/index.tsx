import { Fragment } from "react";

import { getTrendingContents, getTopRatedContents } from "@/lib/movie-data";
import ContentGrid from "@/components/contents/content-grid";

export async function getStaticProps() {
  const trendingTvShows = await getTrendingContents("tv");
  const topRatedTvShows = await getTopRatedContents("tv");

  return {
    props: {
      tvShows: { trending: trendingTvShows, topRated: topRatedTvShows },
    },
  };
}

export default function AllTvShowsPage({ tvShows }) {
  return (
    <Fragment>
      <div className="pb-10">
        <ContentGrid
          contents={tvShows.trending}
          heading={"trending TV shows"}
        />
        <ContentGrid
          contents={tvShows.topRated}
          heading={"top rated TV shows"}
        />
      </div>
    </Fragment>
  );
}
