import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { uiActions } from "../../store/ui-slice";

import classes from "./modal.module.css";

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const Notification = () => {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.ui.notification);
  const closeHandler = () => {
    dispatch(uiActions.unshownNotif());
  };

  return (
    <Fragment>
      <Backdrop onClose={closeHandler} />
      <section className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 overflow-y-auto">
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {message}
              </p>
            </div>

            <div className="flex justify-center border-t border-pink-200 rounded-b">
              <button
                type="button"
                onClick={closeHandler}
                className="w-full text-pink-600 bg-white font-medium rounded-lg px-5 py-2.5 text-center text-lg dark:bg-blue-600"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Notification;
