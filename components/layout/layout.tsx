import { Fragment, useContext } from "react";
import AuthFormContext from "../../store/auth-context";

import NavBar from "./navbar";
import AuthForm from "../auth/auth-form";

export default function Layout(props) {
  const modalCtx = useContext(AuthFormContext);

  return (
    <Fragment>
      <NavBar />
      <main>{props.children}</main>
      {modalCtx.isShown && <AuthForm />}
    </Fragment>
  );
}
