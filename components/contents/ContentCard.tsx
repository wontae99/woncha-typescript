import Image from "next/image";
import Link from "next/link";

import { Variants, motion } from "framer-motion";

import { ContentData } from "@/lib/types";
import { StarIcon } from "@heroicons/react/24/solid";

type Props = {
  content: ContentData;
  contentType: "movie" | "tv";
  index: number;
};

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const ContentCard = ({ content, contentType, index }: Props) => {
  const img_url = `https://image.tmdb.org/t/p/w500/${content.poster_path}`;
  const contentTitle = content.title || content.name;
  const rate = Math.round(content.vote_average * 10) / 10;

  const MotionLink = motion(Link);
  const MotionImage = motion(Image);

  return (
    <MotionLink
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.15,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      href={`/${contentType}/${content.id}`}
      className="max-w-sm rounded relative w-[40vh] sm:w-full"
    >
      <div className="relative w-full h-[40vh] rounded-md border-[0.5px] border-slate-500 overflow-hidden">
        <MotionImage
          src={img_url}
          alt={content.name || content.title}
          fill
          className="hover:scale-105 transition duration-300"
        />
      </div>
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-xl line-clamp-1 w-full">
            {contentTitle}
          </h2>
          <div className="py-1 px-2 bg-[#007d43] rounded-sm">
            <p className="text-white text-sm font-bold capitalize">
              {contentType}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <StarIcon color="#f5f125" width={20} />
            <p className="text-base font-bold">{rate}</p>
          </div>
        </div>
      </div>
    </MotionLink>
  );
};

export default ContentCard;
