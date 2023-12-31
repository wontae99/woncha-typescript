import { Fragment } from "react";
import Head from "next/head";
// types
import type { GetStaticProps, GetStaticPaths } from "next";
import { ContentData } from "@/lib/types";
// libs for fetching data
import {
  getAllContentIds,
  getDataWithId,
  getVideoWithId,
} from "@/lib/movie-data";
// components
import ContentPage from "@/components/contents/content-page";

export const getStaticPaths: GetStaticPaths = async () => {
  const contentIdList = await getAllContentIds("movie");
  const paths = contentIdList.map((id: string) => ({
    params: { movieId: id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context: {
  params: { movieId: string };
}) => {
  const contentId = context.params.movieId;
  const data = await getDataWithId("movie", contentId);
  const contentVideo = await getVideoWithId("movie", contentId);

  if (contentVideo) {
    data.videoData = contentVideo;
  }

  return {
    props: {
      data,
      contentId,
    },
    revalidate: 1,
  };
};

export default function MovieDetailPage({ data }: { data: ContentData }) {
  return (
    <Fragment>
      <Head>
        <title>Movie - {data.title}</title>
        <meta name="description" content={data.overview} />
      </Head>
      <ContentPage data={data} type="movie" />
    </Fragment>
  );
}
