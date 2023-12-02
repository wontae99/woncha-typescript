import ContentItem from "./content-item";
import Carousel from "../ui/carousel";
import { ContentData } from "../../lib/types";

import Link from "next/link";

interface ContentGridProps {
  contents: ContentData[];
  heading: string;
}

const ContentGrid: React.FC<ContentGridProps> = ({ contents, heading }) => {
  const contentType = heading.includes("Movie") ? "movie" : "tv";
  const contentOption = heading.includes("Trending") ? "trending" : "top-rated";

  return (
    <section className="pt-10 px-5">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold capitalize text-black dark:text-slate-50">
          {heading}
        </h1>
        <Link
          className="text-center self-end dark:text-white"
          href={`${contentType}/${contentOption}`}
        >
          View all
        </Link>
      </div>
      <Carousel>
        {contents.map((content) => (
          <ContentItem
            key={content.id}
            content={content}
            contentType={contentType}
          />
        ))}
      </Carousel>
    </section>
  );
};

export default ContentGrid;
