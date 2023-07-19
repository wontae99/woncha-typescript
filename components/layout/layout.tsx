import { Fragment, useContext } from "react";
import AuthFormContext from "../../store/auth-context";

import NavBar from "./navbar";
import AuthForm from "../auth/auth-form";

export default function Layout({ children }: { children: React.ReactNode }) {
  const modalCtx = useContext(AuthFormContext);

  return (
    <Fragment>
      <NavBar />
      <main>{children}</main>
      {modalCtx.isShown && <AuthForm />}
    </Fragment>
  );
}
