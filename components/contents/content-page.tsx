// type
import { ContentData } from "@/lib/types";
//icon
import { StarIcon } from "@heroicons/react/24/solid";
// components
import SideBar from "./sidebar";
import Comments from "../comments/comments";
import Carousel from "../ui/carousel";
import ContentItem from "./content-item";

export default function ContentPage({
  data,
  type,
}: {
  data: ContentData;
  type: "movie" | "tv";
}) {
  const backdrop_url = "https://image.tmdb.org/t/p/w500" + data.backdrop_path;
  const rate = Math.round(data?.vote_average! * 10) / 10;
  const releaseYear = new Date(
    data.release_date || data.first_air_date
  ).getFullYear();
  const genres = data?.genres?.map((genre) => (
    <div className="py-1 px-2 bg-[#007d43] rounded-md" key={genre.id}>
      <p className="text-white">{genre.name}</p>
    </div>
  ));

  return (
    <main className="relative w-full">
      <div
        className={`relative w-full bg-black bg-gradient-to-l from-white via-black to-white`}
      >
        <img
          src={backdrop_url}
          alt="BackdropImage"
          className={`bg-cover w-full`}
        />
      </div>
      {/* 타이틀 섹션 */}
      <section className="flex w-full flex justify-between flex-col md:flex-row p-4 md:p-8">
        <div className="text-start leading-normal self-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-black mb-2">
            {data?.name || data.title}
          </h1>
          <div className="my-2 flex flex-row space-x-4 text-base font-bold md:text-xl">
            <div className="flex flex-row space-x-1">
              <StarIcon color="#f5f125" width={20} />
              <p>{rate}</p>
            </div>
            <p>{releaseYear}</p>
            <p>{data.status}</p>
          </div>
          <div className="my-2 flex flex-row space-x-4 text-base font-bold">
            {genres}
          </div>
        </div>
        <SideBar type={type} contentId={data.id.toString()} />
      </section>

      {/* 디테일 */}
      <section className="w-full divide-y divide-slate-200 p-4 md:p-8">
        <div className="">
          <h2 className="text-2xl pb-4 font-semibold">Overview</h2>
          {data.tagline && (
            <h3 className="text-lg italic pb-2 text-gray-500">
              "{data.tagline}"
            </h3>
          )}
          <p className="mb-4 text-lg leading-relaxed text-blueGray-700 dark:text-slate-200">
            {data.overview ? data.overview : ""}
          </p>
        </div>

        {data.videoData && (
          <div className="p-2">
            <h2 className="text-2xl py-4 font-semibold dark:text-white">
              Videos
            </h2>
            <Carousel>
              {data.videoData.map((video: any) => (
                <ContentItem
                  key={video.id}
                  content={video}
                  contentType={"video"}
                />
              ))}
            </Carousel>
          </div>
        )}

        <div id="comment" className="w-full px-4 py-4">
          <h2
            id="comment"
            className="text-2xl pb-4 font-semibold dark:text-white"
          >
            Comments
          </h2>
          <Comments type={type} contentId={data.id} />
        </div>
      </section>
    </main>
  );
}

// genreContainer: {
//     backgroundColor: "#007d43",
//     paddingVertical: 2,
//     paddingHorizontal: 4,
//     marginRight: 8,
//     borderRadius: 4,
//   },
