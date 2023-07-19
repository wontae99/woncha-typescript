import Link from "next/link";

import Card from "../ui/card";
import Carousel from "../ui/carousel";

type MyListProps = {
  type: "movie" | "tv";
  id: string;
}[];

const MyList = ({ list }: { list: MyListProps }) => {
  return (
    <Carousel>
      {list.map((item) => (
        <Link
          key={item.type + item.id}
          href={`/content/${item.type}/${item.id}`}
        >
          <div className="carousel-item text-white relative w-40 h-60 md:w-48 md:h-72 py-2 snap-end transition ease-in-out delay-100 hover:-translate-y-2">
            <Card item={item} />
          </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default MyList;
