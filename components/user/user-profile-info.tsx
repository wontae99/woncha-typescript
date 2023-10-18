// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";

// import { uiActions } from "../../store/ui-slice";
// import { useAppDispatch } from "../hooks/redux-hooks";

// export default function UserProfileInfo({ data }) {
//   const { data: session } = useSession();
//   let img_url: string;
//   if (session) {
//     img_url = session.user.image || "/images/no-profile-icon.png";
//   }

//   const dispatch = useAppDispatch();

//   const toggleMovieList = () => {
//     dispatch(uiActions.toggleMovieList());
//   };
//   const toggleTVList = () => {
//     dispatch(uiActions.toggleTVList());
//   };

//   const movieNum = data.wishList?.filter(
//     (item) => item.type === "movie"
//   ).length;
//   const tvNum = data.wishList?.filter((item) => item.type === "tv").length;
//   const commentNum = data.comment?.length;
//   const registerDate = new Date(data.registerDate).toLocaleDateString("en-US", {
//     month: "short",
//     day: "2-digit",
//     year: "numeric",
//   });

//   return (
//     <div className="flex flex-wrap justify-center space-y-4 -translate-y-16">
//       <div className="w-full px-4 flex justify-center">
//         <div className="relative">
//           <Image
//             alt="profile img"
//             src={img_url}
//             width={200}
//             height={200}
//             placeholder="blur"
//             blurDataURL="./images/no-profile-icon.png"
//             className="shadow-xl rounded-full justify-center h-auto border-none max-w-150-px"
//           />
//         </div>
//       </div>
//       <div className="text-center">
//         <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
//           {data.name}
//         </h3>
//         <div className="text-md leading-normal mb-2 text-blueGray-400 font-bold">
//           {registerDate}
//         </div>
//       </div>

//       <div className="w-full px-4">
//         <div className="flex justify-center pt-8 space-x-12">
//           <button
//             type="button"
//             className="text-center group"
//             onClick={toggleMovieList}
//           >
//             <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 group-hover:underline">
//               {movieNum}
//             </span>
//             <span className="text-sm text-blueGray-400">Movies</span>
//           </button>
//           <button
//             type="button"
//             className="text-center group"
//             onClick={toggleTVList}
//           >
//             <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 group-hover:underline">
//               {tvNum}
//             </span>
//             <span className="text-sm text-blueGray-400">TVs</span>
//           </button>
//           <div className="text-center group">
//             <Link href={`/user/${data.id}/my-comment`}>
//               <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 group-hover:underline">
//                 {commentNum}
//               </span>
//               <span className="text-sm text-blueGray-400">Comments</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
