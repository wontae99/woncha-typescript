import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useInView } from "react-intersection-observer";

import loadContentList from "../contents/load-content";

export type LoadMoreProps = {
  contentType: "movie" | "tv";
  option: "trending" | "top-rated";
};

let page = 2;

const LoadMore = ({ contentType, option }: LoadMoreProps) => {
  const { ref, inView } = useInView();
  const [data, setData] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (inView) {
      loadContentList({ contentType, option, page }).then((res) => {
        setData([...data, ...res]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      <section className="content-card-grid">
        {data}
      </section>
      <section ref={ref} className="flex justify-center items-center w-full">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="66"
          visible={true}
        />
      </section>
    </>
  );
};

export default LoadMore;
