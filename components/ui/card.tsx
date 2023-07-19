import { useEffect, useState, memo } from "react";
import Image from "next/image";
import { getDataWithId } from "../../lib/movie-data";

const Card = ({ item }) => {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    getDataWithId(item.type, item.id).then((data) => {
      setCardData(data);
    });
  }, []);

  return (
    cardData && (
      <div className="card card-compact image-full w-64 bg-base-100 border-2 border-slate-100">
        <figure>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${cardData.poster_path}`}
            alt="poster"
            width={200}
            height={400}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-blueGray-50">
            {item.type === "movie" ? cardData.title : cardData.name}
          </h2>
        </div>
      </div>
    )
  );
};

export default memo(Card);
