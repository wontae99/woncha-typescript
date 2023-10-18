import { Fragment } from "react";
import Head from "next/head";
// types
import type { GetStaticProps, GetStaticPaths } from "next";
// libs for data-fetching
import {
  getAllContentIds,
  getDataWithId,
  getVideoWithId,
} from "@/lib/movie-data";
//components
import { ContentData } from "@/lib/types";
import ContentPage from "@/components/contents/content-page";

export const getStaticPaths: GetStaticPaths = async () => {
  const contentIdList = await getAllContentIds("tv");
  const paths = contentIdList.map((id) => ({
    params: { tvShowId: id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context: {
  params: { tvShowId: string };
}) => {
  const contentId = context.params.tvShowId;
  const data = await getDataWithId("tv", contentId);
  const contentVideo = await getVideoWithId("tv", contentId);

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

export default function TvShowDetailPage({ data }: { data: ContentData }) {
  return (
    <Fragment>
      <Head>
        <title>TV show - {data.name}</title>
        <meta name="description" content={data.overview} />
      </Head>
      <ContentPage data={data} type="tv" />
    </Fragment>
  );
}
