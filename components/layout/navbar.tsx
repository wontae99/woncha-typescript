import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import AuthFormContext from "@/store/auth-context";
import NavProfile from "./nav-profile";
import NavbarUnder from "./navbar-under";
import SearchModal from "./search-modal";
import ThemeSwitch from "../ui/theme-switch";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  /// hide-show navbar on scroll
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    let prevScrollpos = window.scrollY;

    const controlNav = () => {
      let currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener("scroll", controlNav);
    return () => {
      window.removeEventListener("scroll", controlNav);
    };
  }, []);

  ///
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const navigation = [
    { name: "Movie", href: "/movie" },
    { name: "TV", href: "/tv" },
  ];

  const { data: session } = useSession();
  const authFormCtx = useContext(AuthFormContext);

  // onclick handlers
  const showLoginFormHandler = () => {
    authFormCtx.showAuthForm("signin");
  };

  const showSignupHandler = () => {
    authFormCtx.showAuthForm("signup");
  };

  return (
    <Fragment>
      <nav
        className={`${
          showNav ? "opacity-100" : "opacity-0"
        } p-4 bg-white dark:bg-[#171717] transition-opacity top-0 ease-in duration-300 z-20 sticky w-full
        `}
      >
        <div className="mx-auto">
          <div className="relative flex items-center justify-between">
            <div className="flex space-x-2 sm:space-x-4 items-center justify-center">
              <Link
                href="/"
                className="flex text-2xl sm:text-3xl font-bold italic"
              >
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
                      "font-bold text-xl pl-2 sm:pl-4 hover:text-pink-600 hidden sm:block"
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <button
                onClick={() => setShowSearch(true)}
                className="pl-2 sm:pl-4 text-xl text-black dark:text-white hover:text-pink-600"
              >
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </div>
            <div className="flex flex-row items-center">
              {/* <ModeButton /> */}
              <ThemeSwitch />
              <button
                onClick={() => signOut()}
                className="sm:hidden text-white ml-4 p-1 bg-pink-500 hover:bg-pink-600 rounded-md"
              >
                Log out
              </button>
              <div className="sm:ml-6 hidden sm:block">
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
                  <NavProfile
                    onClick={() => signOut({ redirect: true })}
                    classNames={classNames}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <NavbarUnder
        onOpen={() => setShowSearch(true)}
        onClose={() => setShowSearch(false)}
      />

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </Fragment>
  );
}
