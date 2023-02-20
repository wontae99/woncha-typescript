import { createContext, useState } from "react";

const AuthFormContext = createContext({
  isShown: null,
  isForLogin: null,
  isEdit: null,
  showAuthForm: () => {},
  hideAuthForm: () => {},
  toggleLoginForm: () => {},
  showSignup: () => {},
  showLogin: () => {},
  setIsEdit: () => {},
  setIsAdd: () => {},
});

export function AuthFormContextProvider(props) {
  const [isShown, setIsShown] = useState(false);
  const [isForLogin, setIsForLogin] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const toggleFormHandler = () => {
    setIsForLogin((prevState) => !prevState);
  };

  const showLoginFormHandler = () => {
    setIsForLogin(true);
  };

  const showSignupHandler = () => {
    setIsForLogin(false);
  };

  const showAuthFormHandler = () => {
    setIsShown(true);
  };

  const hideAuthFormHandler = () => {
    setIsShown(false);
  };

  const context = {
    isShown,
    isForLogin,
    isEdit,
    showAuthForm: showAuthFormHandler,
    hideAuthForm: hideAuthFormHandler,
    toggleLoginForm: toggleFormHandler,
    showSignup: showSignupHandler,
    showLogin: showLoginFormHandler,
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
