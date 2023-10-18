import { useContext } from "react";

import AuthFormContext from "@/store/auth-context";

const AuthFallback = () => {
  const modalCtx = useContext(AuthFormContext);
  const openAuthForm = () => {
    modalCtx.showAuthForm("signin");
  };
  
  return (
    <section className="w-full h-screen items-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="text-lg font-bold text-center m-8">
          This page needs login.
        </p>
        <button
          className="text-2xl text-pink-700 flex mx-auto"
          onClick={openAuthForm}
        >
          Sign In
        </button>
      </div>
    </section>
  );
};

export default AuthFallback;
