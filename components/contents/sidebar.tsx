import { useContext, useEffect, useState } from "react";
//icons
import {
  ChatBubbleLeftEllipsisIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
// Context
import AuthFormContext from "@/store/auth-context";
import { itemActions } from "@/store/item-slice";
import { useSession } from "next-auth/react";
// hooks
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { uiActions } from "@/store/ui-slice";
// css module

export default function SideBar({
  type,
  contentId,
}: {
  type: "movie" | "tv";
  contentId: string;
}) {
  const { data: session } = useSession();
  const authFormCtx = useContext(AuthFormContext);

  const dispatch = useAppDispatch();
  const { item } = useAppSelector((state) => state);
  const [isAdded, setIsAdded] = useState(
    !!item.items.find((item) => item.id === contentId && item.type === type)
  );

  useEffect(() => {
    setIsAdded(
      !!item.items.find((item) => item.id === contentId && item.type === type)
    );
  }, [item]);

  const toggleItemHandler = () => {
    if (!session) {
      authFormCtx.showAuthForm("signin");
      return;
    }
    if (isAdded) {
      dispatch(itemActions.deleteItem({ type, id: contentId }));
      dispatch(uiActions.showNotification({ message: "Removed from my List" }));
    } else {
      dispatch(itemActions.addItem({ type, id: contentId }));
      dispatch(uiActions.showNotification({ message: "Added to my List" }));
    }
  };

  return (
    <div className="relative md:w-1/3 border-b-[1px] md:border-none text-slate-800 dark:text-slate-200">
      <div className="py-4 md:py-0 flex justify-around text-center font-bold">
        <button
          type="button"
          onClick={toggleItemHandler}
          className={`hover:text-gray-800 dark:text-white dark:hover:text-gray-200`}
        >
          {isAdded ? (
            <>
              <XMarkIcon width={30} className="mx-auto" />
              Never mind
            </>
          ) : (
            <>
              <PlusIcon width={30} className="mx-auto" />
              Dibs
            </>
          )}
        </button>
        <div className="hover:text-gray-800 dark:text-white dark:hover:text-gray-200">
          <button
            onClick={() => {
              document.getElementById("comment").scrollIntoView();
            }}
          >
            <ChatBubbleLeftEllipsisIcon width={30} className="mx-auto" />
            Review
          </button>
        </div>
      </div>
    </div>
  );
}
