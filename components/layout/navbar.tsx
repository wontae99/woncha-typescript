import { Fragment, useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import AuthFormContext from "../../store/auth-context";
import NavProfile from "./nav-profile";
import NavbarUnder from "./navbar-under";
import SearchModal from "./search-modal";
import ThemeSwitch from "../ui/theme-switch";

import { ColorTheme } from "../../constants/color-theme";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const queries = Object.entries(router.query);
  const navigation = [
    { name: "Movie", href: "/content/movie" },
    { name: "TV", href: "/content/tv" },
  ];

  const { data: session } = useSession();
  const modalCtx = useContext(AuthFormContext);

  const showLoginFormHandler = () => {
    modalCtx.showLogin();
    modalCtx.showAuthForm();
  };

  const showSignupHandler = () => {
    modalCtx.showSignup();
    modalCtx.showAuthForm();
  };

  const openSearchHandler = () => {
    setShowSearch(true);
  };

  const closeSearchHandler = () => {
    setShowSearch(false);
  };

  const logoutHandler = () => {
    signOut({ redirect: true });
  };

  return (
    <Fragment>
      <div
        className={`bg-white dark:bg-[${
          ColorTheme.darkBackGround
        }] sticky w-full z-20 top-0 left-0 border-b dark:border-slate-400 ${
          queries.length === 0 ? "" : "hidden sm:block"
        }`}
      >
        <div className="mx-auto px-2">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex p-4 space-x-4 divide-x-2 items-center justify-center">
              <Link href="/" className="flex text-3xl font-bold italic">
                <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 hover:before:bg-pink-600 relative inline-block">
                  <span className="relative text-white">WONCHA</span>
                </span>
              </Link>
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={classNames(
                      router.pathname === item.href
                        ? "text-black dark:text-white"
                        : "text-blueGray-400",
                      "font-bold pl-4  hover:text-pink-600"
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <button
                onClick={openSearchHandler}
                className="pl-4 text-black dark:text-white hover:text-pink-600"
              >
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </div>
            <div className="flex flex-row items-center ">
              {/* <ModeButton /> */}
              <ThemeSwitch />
              <div className="sm:ml-6 px-2 hidden sm:block">
                <div className="dark:text-white space-x-4">
                  {!session && (
                    <button onClick={showLoginFormHandler}>Login</button>
                  )}
                  {!session && (
                    <button onClick={showSignupHandler}>SignUp</button>
                  )}
                </div>
                {/* Profile dropdown */}
                {session && (
                  <NavProfile onClick={logoutHandler} classNames={classNames} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarUnder onOpen={openSearchHandler} onClose={closeSearchHandler} />

      {showSearch && <SearchModal onClose={closeSearchHandler} />}
    </Fragment>
  );
}
