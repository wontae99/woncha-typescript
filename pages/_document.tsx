import { Html, Head, Main, NextScript } from "next/document";

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
          crossOrigin="anonymous"
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
      </Head>
      <body className="mb-16 sm:mb-0">
        <div id="modal-overlay" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
