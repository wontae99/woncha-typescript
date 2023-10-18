import { itemActions } from "./item-slice";
import { uiActions } from "./ui-slice";

import { Item, ItemState } from "../lib/types";

type successMsg = "Added to my list." | "Removed from my list.";

export const fetchItemData = (userId: string) => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const response = await fetch(`/api/wish-list/${userId}`);
      const data = await response.json();

      return data.wishList;
    };

    try {
      const listData = await fetchData();
      dispatch(
        itemActions.replaceItem({
          items: listData,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "Failed to load watch list.",
        })
      );
    }
  };
};

export const sendListData = (userId: string, itemState: ItemState) => {
  return async (dispatch: any) => {
    const sendRequest = async () => {
      const response = await fetch(`/api/wish-list/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          items: itemState.items,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to request...");
      }
    };

    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Request failed!",
        })
      );
      console.log(err.message);
    }
  };
};
