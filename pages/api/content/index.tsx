import type { NextApiRequest, NextApiResponse } from "next";

import { getTopRatedContents, getTrendingContents } from "@/lib/movie-data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const trendingMovies = await getTrendingContents("movie");
      const trendingTvShows = await getTrendingContents("tv");
      const topRatedMovies = await getTopRatedContents("movie");
      const topRatedTvShows = await getTopRatedContents("tv");

      return {
        contents: {
          movies: { trending: trendingMovies, topRated: topRatedMovies },
          tvShows: { trending: trendingTvShows, topRated: topRatedTvShows },
        },
      };
    } catch (err) {
      res.status(500).json({
        message: "Failed to connect to load content data." || err.message,
      });
    }
  }
}
