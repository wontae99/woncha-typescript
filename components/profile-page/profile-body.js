import { useSelector } from "react-redux";
import { signOut } from "next-auth/react";

import ProfileBodyCard from "../ui/profile-body-card";
import MyList from "./my-list";
import UserProfileInfo from "./user-profile-info";

export default function ProfileBody({ data }) {
  const showMyList = useSelector((state) => state.ui.myList);
  const movieList = data.wishList?.filter((item) => item.type === "movie");
  const tvList = data.wishList?.filter((item) => item.type === "tv");

  return (
    <ProfileBodyCard>
      <button
        className="absolute right-2 top-2 z-10 text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
      <div className="px-6">
        <UserProfileInfo data={data} />
        <ul className="grid grid-cols-1">
          {showMyList.showMovie && (
            <li id="my-movie" className="pt-4 first:pt-0">
              <h2 className="text-lg font-bold text-black">My Movies</h2>
              <MyList list={movieList} />
            </li>
          )}
          {showMyList.showTV && (
            <li id="my-tv" className="pt-4 first:pt-0">
              <h2 className="text-lg font-bold">My TVs</h2>
              <MyList list={tvList} />
            </li>
          )}
        </ul>
      </div>
    </ProfileBodyCard>
  );
}
