import { useEffect, useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

import { itemActions } from "@/store/item-slice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";

import { getDataWithId } from "@/lib/movie-data";
import { Item } from "@/lib/types";

import { TrashIcon } from "@heroicons/react/20/solid";
import { sendListData } from "@/store/item-action";
import { uiActions } from "@/store/ui-slice";

const Card = ({ item }: { item: Item }) => {
  const session = useSession();
  const dispatch = useAppDispatch();

  const [cardData, setCardData] = useState(null);
  const [hovering, setHovering] = useState(false);

  const appState = useAppSelector((state) => state);

  useEffect(() => {
    getDataWithId(item.type, item.id).then((data) => {
      setCardData(data);
    });
  }, []);

  const removeItemHandler = () => {
    dispatch(itemActions.deleteItem({ type: item.type, id: item.id }));
    dispatch(
      uiActions.showNotification({ message: "Removed from list." })
    );
  };

  return (
    cardData && (
      <motion.div
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
        className="w-full h-full"
      >
        <AnimatePresence>
          {session && hovering && (
            <motion.button
              className={`w-12 h-12 p-2 bg-gray-400 hover:bg-red-400 rounded-full z-30 absolute right-0 translate-x-1/8 -translate-y-1/8`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              exit={{ opacity: 0 }}
              onClick={removeItemHandler}
            >
              <TrashIcon />
            </motion.button>
          )}
        </AnimatePresence>
        <Link
          href={`/${item.type}/${item.id}`}
          className="card card-compact image-full overflow-hidden w-full h-full bg-base-100 border-2 border-slate-100"
        >
          <figure className="relative">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${cardData.poster_path}`}
              alt={cardData.title || cardData.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={`https://image.tmdb.org/t/p/w500/${cardData.poster_path}`}
              fill
            />
          </figure>
          <div className="card-body w-full h-full">
            <h2 className="card-title text-gray-100">
              {item.type === "movie" ? cardData.title : cardData.name}
            </h2>
          </div>
        </Link>
      </motion.div>
    )
  );
};

export default memo(Card);
