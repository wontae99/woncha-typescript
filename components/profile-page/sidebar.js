import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import AuthFormContext from "../../store/auth-context";

import { PencilIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { itemActions } from "../../store/item-slice";
import classes from "./sidebar.module.css";
import { useSession } from "next-auth/react";

export default function SideBar({ type, contentId }) {
  const { data: session } = useSession();
  const AuthFormCtx = useContext(AuthFormContext);

  const dispatch = useDispatch();
  const { isAdded, items } = useSelector((state) => state.item);
  const [btnIsHighlited, setBtnIsHighlighted] = useState(false);
  const [rotate, setRotate] = useState("");

  const spinClasses = btnIsHighlited ? classes.spin : "";

  useEffect(() => {
    dispatch(itemActions.checkIsAdded({ type, contentId }));
  }, [type, contentId, dispatch]);

  useEffect(() => {
    setRotate("");
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
      setRotate("rotate-45");
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const toggleItemHandler = () => {
    if (!session) {
      AuthFormCtx.showAuthForm();
      return;
    }
    dispatch(itemActions.toggleItem({ type, contentId }));
  };

  return (
    <div className="w-full md:w-24 relative md:fixed z-10 md:right-0 md:bottom-1/4 bg-white dark:bg-slate-800 md:bg-violet-50 border-b-[2px] md:shadow-xl md:rounded-l-lg text-slate-800 dark:text-slate-200 md:text-slate-900">
      <div className="py-4 grid grid-cols-2 md:grid-cols-1 md:space-y-8 text-center">
        <div className="">
          <button
            type="button"
            onClick={toggleItemHandler}
            disabled={btnIsHighlited}
            className={btnIsHighlited ? "cursor-wait" : ""}
          >
            <XCircleIcon
              width={40}
              className={`mx-auto ${
                isAdded
                  ? "text-red-500 hover:text-red-400"
                  : `text-blue-500 hover:text-blue-400 ${rotate}`
              } ${spinClasses}`}
            />
            {isAdded ? "Never mind" : "Want to see"}
          </button>
        </div>
        <div className="">
          <Link href="#comment">
            <PencilIcon
              width={40}
              className="text-yellow-600 hover:text-yellow-500 mx-auto"
            />
            Comment
          </Link>
        </div>
      </div>
    </div>
  );
}
