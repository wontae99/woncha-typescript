import Link from "next/link";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import AuthFormContext from "../../store/auth-context";

import {
  ChatBubbleLeftEllipsisIcon,
  FilmIcon,
  HeartIcon,
  TvIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import SearchModal from "./search-modal";

interface NavbarUnderProps {
  onOpen: () => void;
  onClose: () => void;
  showModal?: () => void;
}

const NavbarUnder: React.FC<NavbarUnderProps> = ({
  onOpen,
  onClose,
  showModal,
}) => {
  const { data: session } = useSession();
  const modalCtx = useContext(AuthFormContext);

  return (
    <div
      className={`btm-nav pb-1 text-[#ec4899] bg-white dark:bg-[#18181b] visible sm:invisible fixed w-full z-30 bottom-0 left-0 border-t`}
    >
      <Link href={`/movie`} className={`pt-1 hover:text-[#db2777] pt-1`}>
        <FilmIcon width={30} height={30} />
        Movie
      </Link>
      <Link href="/tv" className={`text-[#ec4899] hover:text-[#db2777] pt-1`}>
        <TvIcon width={30} height={30} />
        TV
      </Link>
      {session ? (
        <>
          <Link
            className={`hover:text-[#db2777] pt-1`}
            href={`/my-review`}
          >
            <ChatBubbleLeftEllipsisIcon width={36} height={36} />
            Review
          </Link>
          <Link
            className={`hover:text-[#db2777] pt-1`}
            href={`/my-list`}
          >
            <HeartIcon width={36} height={36} />
            Dibs
          </Link>
        </>
      ) : (
        <button
          type="button"
          className={`hover:text-[#db2777] pt-1`}
          onClick={() => modalCtx.showAuthForm("signin")}
        >
          <UserCircleIcon width={36} height={36} />
          Login
        </button>
      )}
      {showModal && <SearchModal onClose={onClose} />}
    </div>
  );
};

export default NavbarUnder;
