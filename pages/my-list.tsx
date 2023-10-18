import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { useAppDispatch, useAppSelector } from "@/components/hooks/redux-hooks";
import { uiActions } from "@/store/ui-slice";

import AuthFallback from "@/components/layout/auth-fallback";
import MyList from "@/components/user/my-list";
import PageLoader from "@/components/ui/page-loader";
import { itemActions } from "@/store/item-slice";

// SEO 필요없는 페이지 <- CSR로 데이터 패칭
function MyListPage() {
  const { data: session, status } = useSession();
  const { items } = useAppSelector((state) => state.item);

  // useEffect(() => {
  //   if (!session) return;

  //   const userId = session?.user.id;
  //   fetch(`/api/wish-list/${userId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       dispatch(itemActions.replaceItem(data.wishList));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       dispatch(
  //         uiActions.showNotification({ message: "Failed to load data." })
  //       );
  //     });
  // }, []);

  return status === "unauthenticated" ? (
    <AuthFallback />
  ) : (
    <MyList watchList={items} />
  );
}
export default MyListPage;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const userId = context.params.userId as string;
//   let client: MongoClient;
//   let signedUser: any;

//   try {
//     client = await connectToDatabase();
//     signedUser = await client
//       .db()
//       .collection("users")
//       .findOne({ _id: new ObjectId(userId) });
//   } catch (err) {
//     window.alert(err.message || err);
//   }
//   client.close();

//   return {
//     props: {
//       wishList: signedUser.wishList
//         ? JSON.parse(JSON.stringify(signedUser.wishList))
//         : [],
//     },
//   };
// }
