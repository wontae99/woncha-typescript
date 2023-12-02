import React from "react";

import { ContentData } from "@/lib/types";
import { getTopRatedContents, getTrendingContents } from "@/lib/movie-data";

import ContentCard from "./ContentCard";
import { LoadMoreProps } from "../ui/LoadMore";

interface LoadContentProps extends LoadMoreProps {
  page: number;
}

const loadContentList = async ({
  contentType,
  option,
  page,
}: LoadContentProps) => {
  let data: ContentData[];
  if (option === "top-rated") {
    data = await getTopRatedContents(contentType, page);
  } else {
    data = await getTrendingContents(contentType, page);
  }

  return data.map((content: ContentData, index) => (
    <ContentCard
      key={content.id}
      content={content}
      contentType={contentType}
      index={index}
    />
  ));
};

export default loadContentList;
