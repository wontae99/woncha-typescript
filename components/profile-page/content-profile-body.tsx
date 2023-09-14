import { Fragment } from "react";
import Link from "next/link";

import SideBar from "./sidebar";
import Carousel from "../ui/carousel";
import ContentItem from "../contents/content-item";
import Comments from "../comments/comments";
import { ColorTheme } from "constants/color-theme";

const darkBackGround = ColorTheme.darkBackGround;

export default function ContentProfileBody({ data, type, contentId }) {
  const { videoData } = data;

  return (
    <Fragment>
      {/* side-bar */}
      <SideBar type={type} contentId={contentId} />

      {/* //// Main Body //// */}

      <section className="md:containter md:absolute bg-white dark:bg-[#18181b] flex flex-col mx-auto w-full md:py-10 p-0">
        <div className="min-w-0 break-words bg-white dark:bg-[#171717] w-full md:mx-auto md:w-3/4 shadow-xl md:rounded-lg">
          <div className="w-full md:p-4 divide-y divide-slate-200">
            <div className="p-2">
              <h2 className="text-2xl pb-4 font-semibold text-black dark:text-white">
                Overview
              </h2>
              {data.tagline && (
                <h3 className="text-lg italic pb-2 text-gray-500">
                  "{data.tagline}"
                </h3>
              )}
              <p className="mb-4 text-lg leading-relaxed text-blueGray-700 dark:text-slate-200">
                {data.overview ? data.overview : ""}
              </p>
            </div>

            {videoData && (
              <div className="p-2">
                <h2 className="text-2xl py-4 font-semibold dark:text-white">
                  Videos
                </h2>
                <Carousel>
                  {videoData.map((video) => (
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
              <h2 className="text-2xl pb-4 font-semibold dark:text-white">
                Comments
              </h2>
              <Comments type={type} contentId={contentId} />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
