import Image from "next/image";
import { memo } from "react";

function ProfileBackdrop({ data, type }) {
  const poster_url = "https://image.tmdb.org/t/p/w500" + data.poster_path;
  const backdrop_url = data.backdrop_path
    ? "https://image.tmdb.org/t/p/w500" + data.backdrop_path
    : "";

  return (
    <section className="relative block h-64 md:h-80">
      <div
        className={`absolute top-0 w-full h-full bg-center bg-cover`}
        style={{ backgroundImage: `url(${backdrop_url})` }}
      >
        <span
          id="blackOverlay"
          className="w-full h-full absolute opacity-30 bg-blueGray-600"
        ></span>
      </div>
      {type !== "user" && (
        <section className="flex w-full absolute bottom-0 p-4">
          <Image
            width={150}
            height={150}
            quality={100}
            alt="profile-img"
            src={poster_url}
            className="shadow-2xl h-auto align-start border-2 border-white max-w-150-px mx-2 md:mx-8"
          />
          <div className="text-start text-white leading-normal self-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:text-blueGray-700">
              {data?.name || data.title}
            </h1>
            <div className="text-md mt-0 mb-2 md:text-blueGray-400 font-bold">
              Dec 24, 2022
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
export default memo(ProfileBackdrop);
