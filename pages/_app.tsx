import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { Provider } from "react-redux";
import { wrapper } from "../store";

import { useAppDispatch, useAppSelector } from "@/components/hooks/redux-hooks";

import { AuthFormContextProvider } from "@/store/auth-context";
import { fetchContentData } from "@/store/content-action";
import { fetchItemData, sendListData } from "@/store/item-action";

import Layout from "@/components/layout/layout";
import PageLoader from "@/components/ui/page-loader";

import { Analytics } from "@vercel/analytics/react";

import "../styles/globals.css";

let isInitial = true;
function App({ Component, pageProps: { session, ...rest } }) {
  const { store, props } = wrapper.useWrappedStore(rest);

  const dispatch = useAppDispatch();
  const { item } = useAppSelector((state) => state);

  const [pageLoading, setPageLoading] = useState(false);
  const [isSession, setIsSession] = useState(false);
  const router = useRouter();

  // 로딩state 동안 페이지 로더 랜더링
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

  // 로그인 중일때 my-list 데이터 패칭
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsSession(true);
        const userId = session.user.id;
        dispatch(fetchItemData(userId));
      }
    });
  }, [dispatch, setIsSession]);

  useEffect(() => {
    if (isInitial) {
      dispatch(fetchContentData());
      isInitial = false;
      return;
    }
    // my-list 추가/삭제 발생시 백앤드로 데이터 보냄

    getSession().then((session) => {
      if (session) {
        const userId = session?.user.id;
        dispatch(sendListData(userId, item));
      }
    });
  }, [dispatch, item, getSession]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <AuthFormContextProvider>
        <SessionProvider session={session}>
          <Provider store={store}>
            <div id="overlays"></div>
            <Layout>
              {pageLoading ? <PageLoader /> : <Component {...props} />}
              <Analytics />
            </Layout>
          </Provider>
        </SessionProvider>
      </AuthFormContextProvider>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
