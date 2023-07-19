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

interface NavbarUnderProps {
  onOpen: () => void;
  onClose: () => void;
  showModal?: () => void;
}

const NavbarUnder: React.FC<NavbarUnderProps> = ({ onOpen, onClose, showModal }) => {
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
    <div className="btm-nav pb-1 text-pink-500 dark:text-pink-400 bg-white dark:bg-slate-800 visible sm:invisible fixed w-full z-20 bottom-0 left-0 border-t">
      <button onClick={onOpen} className="hover:text-pink-700 pt-1">
        <MagnifyingGlassIcon width={30} height={30} />
        Search
      </button>
      <Link className="hover:text-pink-700 dark:bg-slate-800 pt-1" href="/">
        <HomeIcon />
        Home
      </Link>
      <button onClick={profileHandler} className="hover:text-pink-700 pt-1">
        <UserCircleIcon width={36} height={36} />
        {session ? "Profile" : "Login"}
      </button>
      {showModal && <SearchModal onClose={onClose} />}
    </div>
  );
}

export default NavbarUnder;