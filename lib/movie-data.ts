import { ContentData } from "./types";

const api_key = process.env.movie_api_key;
type Content = "tv" | "movie";

export async function getTrendingContents(contentType: Content) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${contentType}/week?api_key=${api_key}`
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getTopRatedContents(contentType: Content) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${contentType}/top_rated?api_key=${api_key}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    throw new Error(err.message || `Failed to fetch ${contentType} data`);
  }
}

export async function getAllContentIds(contentType: Content) {
  const topRatedContents = await getTopRatedContents(contentType);
  const trendingContents = await getTrendingContents(contentType);

  const contents = topRatedContents.concat(trendingContents);

  const contentIdList = [];
  for (let content of contents) {
    contentIdList.push(content.id.toString());
  }

  return contentIdList;
}

export async function getDataWithId(contentType: Content, id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${contentType}/${id}?api_key=${api_key}`
    );

    const data: ContentData = await response.json();

    return data;
  } catch (err) {
    throw new Error(err.message || "Failed to fetch data.");
  }
}

export async function getVideoWithId(contentType: Content, id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${contentType}/${id}/videos?api_key=${api_key}`
    );

    const data = await response.json();
    let videoData: ContentData;

    if (data) {
      videoData = data.results;
      return videoData;
    }

    return;
  } catch (err) {
    throw new Error(err.message || "Failed to fetch movie data");
  }
}
