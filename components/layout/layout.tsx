import { Fragment, useContext } from "react";
import AuthFormContext from "../../store/auth-context";

import NavBar from "./navbar";
import AuthForm from "../auth/auth-form";
import Notification from "./notification";

export default function Layout({ children }: { children: React.ReactNode }) {
  const modalCtx = useContext(AuthFormContext);

  return (
    <Fragment>
      <NavBar />
      <Notification />
      <main>{children}</main>
      {modalCtx.isShown && <AuthForm />}
    </Fragment>
  );
}
