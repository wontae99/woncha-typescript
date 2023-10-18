import { createContext, useState } from "react";

type status = "signin" | "signup";

const AuthFormContext = createContext({
  status: null,
  isShown: null,
  isEdit: null,
  showAuthForm: (status: status) => {},
  hideAuthForm: () => {},
  toggleLoginForm: () => {},
  setIsEdit: () => {},
  setIsAdd: () => {},
});

export function AuthFormContextProvider(props) {
  const [isShown, setIsShown] = useState(false);
  const [status, setStatus] = useState<status>("signin");
  const [isEdit, setIsEdit] = useState(false);

  const toggleFormHandler = () => {
    if (status === "signin") setStatus("signup");
    else setStatus("signin");
  };

  const showAuthFormHandler = (status: status) => {
    setStatus(status);
    setIsShown(true);
  };

  const hideAuthFormHandler = () => {
    setIsShown(false);
  };

  const context = {
    isShown,
    isEdit,
    status,
    showAuthForm: showAuthFormHandler,
    hideAuthForm: hideAuthFormHandler,
    toggleLoginForm: toggleFormHandler,
    setIsEdit: () => {
      setIsEdit(true);
    },
    setIsAdd: () => {
      setIsEdit(false);
    },
  };

  return (
    <AuthFormContext.Provider value={context}>
      {props.children}
    </AuthFormContext.Provider>
  );
}

export default AuthFormContext;
