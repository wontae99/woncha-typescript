import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
        />
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;1,100;1,200&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://kit.fontawesome.com/a876a4e1c6.js"
          crossOrigin="anonymous"
        ></script>
        <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>

        <Script id="toggle-dark-light-mode">{`
        if (
          localStorage.getItem("color-theme") === "dark" ||
          (!("color-theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        `}</Script>
      </Head>
      <body className="bg-white dark:bg-slate-900 mb-16 sm:mb-0">
        <div id="modal-overlay" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
