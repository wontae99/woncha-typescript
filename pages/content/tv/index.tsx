import { Fragment } from "react";
import { useAppSelector } from "@/components/hooks/redux-hooks";

import ContentGrid from "@/components/contents/content-grid";

export default function AllTvShowsPage() {
  const contentData = useAppSelector((state) => state.content.contents);
  const { tvShows } = contentData;
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

// export async function getServerSideProps() {
//   const trendingTvShows = await getTrendingContents("tv");
//   const topRatedTvShows = await getTopRatedContents("tv");

//   return {
//     props: {
//       tvShows: { trending: trendingTvShows, topRated: topRatedTvShows },
//     },
//   };
// }
