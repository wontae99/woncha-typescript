const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const path = require("path");

module.exports = (phase) => {
  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  return {
    images: {
      domains: [
        "k.kakaocdn.net",
        "images.unsplash.com",
        "image.tmdb.org",
        "i3.ytimg.com",
        "lh3.googleusercontent.com",
      ],
      formats: ["image/avif", "image/webp"],
    },
    compiler: {
      // Enables the styled-components SWC transform
      styledComponents: true,
    },
    env: {
      mongodb_username: "wontae",
      mongodb_password: "wontae",
      mongodb_clustername: "cluster0",
      mongodb_database: "project-dev",
      kakao_id: "704d4c95ccb1d17b71d966caf555be1b",
      kakao_secret: "V4BriKpZMCHBDiTO0IZP0wYl4g2CPdTI",
      google_clientId:
        "978735214954-hffk7414s8q145ksv6su107ekt2mjr89.apps.googleusercontent.com",
      google_clientSecret: "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",
      movie_api_key: "b8aafa6f10f8e0d81f357fd9d52efe94",
      SECRET: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx6gts",
    },
    async rewrites() {
      return [
        {
          source: "/api/content/:path*",
          destination: "https://localhost:3000/:path*",
        },
      ];
    },
    // webpack(config, { webpack }) {
    //   config.resolve = {
    //     alias: {
    //       "@components": path.resolve(__dirname, "components"),
    //     },
    //     ...config.resolve,
    //   };
    //   return config;
    // },
  };
};
