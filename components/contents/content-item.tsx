const { motion } = require("framer-motion");

import Link from "next/link";
import Image from "next/image";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";

import VideoModal from "./video-modal";
import { ContentData } from "../../lib/types";
import { staggerHalf, fadeInHalf } from "constants/animations";

interface ContentItemProps {
  content: ContentData;
  contentType: "video" | string;
}

const ContentItem: React.FC<ContentItemProps> = (props) => {
  const { content, contentType } = props;
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const contentTitle = content.title || content.name;

  let img_url: string;
  if (contentType === "video") {
    img_url = `https://i3.ytimg.com/vi/${content.key}/hqdefault.jpg`;
  } else {
    img_url = `https://image.tmdb.org/t/p/w500/${content.poster_path}`;
  }

  function contentClickHandler() {
    if (contentType !== "video") {
      router.push(`/${contentType}/${content.id}`);
    } else {
      setShowModal(true);
    }
  }

  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <motion.section
        variants={staggerHalf}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={fadeInHalf}
          className="carousel-item text-end relative z-0 w-40 h-60 md:w-48 md:h-72 lg:w-64 lg:h-96 snap-end transition ease-in-out sm:transform-none duration-200"
        >
          {contentType === "video" && (
            <PlayCircleIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 bg-white rounded-full ring-8 ring-red-600 ring-inset" />
          )}
          <Link
            href=""
            className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${img_url})`,
            }}
          >
            <Image
              src={img_url}
              alt={content.title || content.name}
              className="w-full aspect-square hidden"
              width={250}
              height={300}
              placeholder="blur"
              blurDataURL={img_url}
            />
          </Link>
          <button
            type="button"
            onClick={contentClickHandler}
            className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-gray-800/50 "
          >
            <h3 className="text-white py-6 px-3 mx-auto text-xl lg:text-2xl font-medium">
              {contentTitle}
            </h3>
          </button>
        </motion.div>
      </motion.section>
      {contentType === "video" && showModal && (
        <VideoModal
          videoKey={content.key}
          title={contentTitle}
          onClose={hideModalHandler}
        />
      )}
    </Fragment>
  );
};
export default ContentItem;
