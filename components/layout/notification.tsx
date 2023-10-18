import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { uiActions } from "@/store/ui-slice";

import classes from "../ui/modal.module.css";

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const Notification = () => {
  const dispatch = useAppDispatch();
  const { message, isShown } = useAppSelector((state) => state.ui.notification);
  const closeHandler = () => {
    dispatch(uiActions.unshownNotif());
  };

  return (
    isShown && (
      <Fragment>
        <Backdrop onClose={closeHandler} />
        <AnimatePresence>
          <section className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <motion.div
              id="notification"
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="overflow-y-auto"
            >
              <div className="relative w-full h-full max-w-2xl md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="p-6 space-y-6">
                    <p className="text-base leading-relaxed">{message}</p>
                  </div>

                  <div className="flex justify-center border-t border-pink-200 rounded-b">
                    <button
                      type="button"
                      onClick={closeHandler}
                      className="w-full text-pink-500 font-medium rounded-lg px-5 py-2.5 text-center text-lg"
                    >
                      close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </AnimatePresence>
      </Fragment>
    )
  );
};

export default Notification;
