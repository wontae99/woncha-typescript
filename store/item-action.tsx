import { itemActions } from "./item-slice";
import { uiActions } from "./ui-slice";

import { ItemState } from "../lib/types";

type successMsg = "Added to my list." | "Removed from my list.";

export const fetchItemData = (userId: string) => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const response = await fetch(`/api/wish-list/${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Filed to fetch wish list data.");
      }

      return data.wishList;
    };

    try {
      const listData = await fetchData();
      dispatch(
        itemActions.replaceItem({
          items: listData || [],
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "Request failed!",
        })
      );
    }
  };
};

export const sendListData = (userId: string, itemState: ItemState) => {
  return async (dispatch: any) => {
    let successMsg: successMsg;
    if (itemState.isAdded) {
      successMsg = `Added to my list.`;
    } else {
      successMsg = `Removed from my list.`;
    }

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
      dispatch(
        uiActions.showNotification({
          status: "success",
          message: successMsg,
        })
      );
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
