import { contentActions } from "./content-slice";
import { uiActions } from "./ui-slice";
import { getTopRatedContents, getTrendingContents } from "../lib/movie-data";

export const fetchContentData = () => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const trendingMovies = await getTrendingContents("movie");
      const trendingTvShows = await getTrendingContents("tv");
      const topRatedMovies = await getTopRatedContents("movie");
      const topRatedTvShows = await getTopRatedContents("tv");

      return {
        movies: { trending: trendingMovies, topRated: topRatedMovies },
        tvShows: { trending: trendingTvShows, topRated: topRatedTvShows },
      };
    };

    try {
      const contentData = await fetchData();
      dispatch(contentActions.setContents(contentData));
    } catch (err) {
      console.log(err.message);
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "Request failed!",
        })
      );
    }
  };
};
