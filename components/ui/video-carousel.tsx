import Carousel from "./carousel";
import Link from "next/link";
import Image from "next/image";

export default function VideoCarousel({ videoData }) {
  let youtubeList = [];
  for (let video of videoData) {
    if (video.site === "YouTube") {
      youtubeList.push(video);
    }
  }
  console.log(youtubeList);

  return (
    <Carousel>
      {youtubeList.map((video) => (
        <div key={video.id} className="flex h-full items-center justify-center">
          <Link
            href=""
            className="h-full w-full aspect-video block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
            style={{
              backgroundImage: `url(https://i3.ytimg.com/vi/${video.key}/maxresdefault.jpg)`,
            }}
          >
            <Image
              src={`https://i3.ytimg.com/vi/${video.key}/maxresdefault.jpg`}
              alt={video.name}
              className="w-full aspect-video hidden"
              width={480}
              height={270}
            />
          </Link>
          <Link
            href=""
            className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-gray-800/50 z-10 "
          >
            <h3 className="text-white py-6 px-3 mx-auto text-xl font-medium">
              {video.name}
            </h3>
          </Link>
        </div>
      ))}
    </Carousel>
  );
}
