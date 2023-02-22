import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, SessionProvider } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../store";
import { uiActions } from "../store/ui-slice";
import { AuthFormContextProvider } from "../store/auth-context";
import { fetchItemData, sendListData } from "../store/item-action";
import { fetchContentData } from "../store/content-action";

import Notification from "../components/ui/notification";
import Layout from "../components/layout/layout";
import PageLoader from "../components/ui/page-loader";
import "../styles/globals.css";
import DarkModeToggler from "../script/dark-mode-toggler";

let isInitial = true;
function App({ Component, pageProps: { session, ...pageProps } }) {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.item);
  const { notification, notifIsShown } = useSelector((state) => state.ui);

  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchContentData());
  }, []);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        const userId = session.user.id;
        dispatch(fetchItemData(userId));
      }
      return;
    });
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (wishList.changed) {
      getSession().then((session) => {
        const userId = session?.user.id;
        dispatch(sendListData(userId, wishList));
      });
    }
  }, [wishList, dispatch]);

  useEffect(() => {
    if (notifIsShown) {
      setTimeout(() => {
        dispatch(uiActions.unshownNotif());
      }, 2000);
    }
  }, [notification]);

  return (
    <Fragment>
      <AuthFormContextProvider>
        <SessionProvider session={session}>
          <div id="overlays"></div>
          {notifIsShown && notification && (
            <Notification
              status={notification.status}
              title={notification.title}
              message={notification.message}
            />
          )}
          <Layout>
            <React.StrictMode>
              {pageLoading ? <PageLoader /> : <Component {...pageProps} />}
            </React.StrictMode>
          </Layout>
        </SessionProvider>
      </AuthFormContextProvider>
      <DarkModeToggler />
    </Fragment>
  );
}

export default wrapper.withRedux(App);
