import ContentItem from "./content-item";
import Carousel from "../ui/carousel";

export default function ContentGrid(props) {
  const { contents, heading } = props;

  let contentType = heading.includes("Movie") ? "movie" : "tv";

  return (
    <div className="pt-10 px-5">
      <h1 className="text-3xl font-bold capitalize dark:text-slate-50">{heading}</h1>
      <Carousel>
        {contents.map((content) => (
          <ContentItem
            key={content.id}
            content={content}
            contentType={contentType}
          />
        ))}
      </Carousel>
    </div>
  );
}
