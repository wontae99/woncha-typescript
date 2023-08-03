import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthFormContext from "../../store/auth-context";

import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import SearchModal from "./search-modal";
import { ColorTheme } from "../../constants/color-theme";

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
  const router = useRouter();
  const modalCtx = useContext(AuthFormContext);

  const profileHandler = () => {
    if (session) {
      router.push(`/user/${session.user.id}`);
    } else {
      modalCtx.showLogin();
      modalCtx.showAuthForm();
    }
  };

  return (
    <div
      className={`btm-nav pb-1 text-[${ColorTheme.tint}] dark:text-[${ColorTheme.lightTint}] bg-white dark:bg-[${ColorTheme.darkBackGround}] visible sm:invisible fixed w-full z-20 bottom-0 left-0 border-t`}
    >
      <button
        type="button"
        onClick={onOpen}
        className={`pt-1 hover:text-[${ColorTheme.tintHover}]`}
      >
        <MagnifyingGlassIcon width={30} height={30} />
        Search
      </button>
      <Link
        className={`text-[${ColorTheme.tint}] hover:text-[${ColorTheme.tintHover}] dark:bg-[${ColorTheme.darkBackGround}] pt-1`}
        href="/"
      >
        <HomeIcon />
        Home
      </Link>
      <button
        type="button"
        onClick={profileHandler}
        className={`hover:text-[${ColorTheme.tintHover}] pt-1`}
      >
        <UserCircleIcon width={36} height={36} />
        {session ? "Profile" : "Login"}
      </button>
      {showModal && <SearchModal onClose={onClose} />}
    </div>
  );
};

export default NavbarUnder;
