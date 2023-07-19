import { useContext, useState } from "react";
import useInput from "../hooks/use-input";
import { signIn } from "next-auth/react";
import { createUser } from "../../lib/auth-util";

import classes from "./border-line.module.css";
import Modal from "../ui/modal";
import AuthFormContext from "../../store/auth-context";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import PlatformLoginBtn from "./platform-login-btn";
import LoginButton from "./login-button";
import AuthModeToggler from "./auth-mode-toggler";
import AuthInput from "./auth-input";

export default function AuthForm(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const authFormCtx = useContext(AuthFormContext);

  const passwordInputProps = useInput("password");
  const emailInputProps = useInput("email");
  const nameInputProps = useInput("name");

  const {
    value: enteredPassword,
    hasError: passwordError,
    isValid: passwordIsValid,
    reset: resetPassword,
  } = passwordInputProps;

  const {
    value: enteredEmail,
    hasError: emailError,
    isValid: emailIsValid,
    reset: resetEmail,
  } = emailInputProps;

  const {
    value: enteredName,
    hasError: nameError,
    isValid: nameIsValid,
  } = nameInputProps;

  let formIsValid = false;

  formIsValid = enteredName
    ? emailIsValid && passwordIsValid && nameIsValid
    : emailIsValid && passwordIsValid;

  // LOGIN & SIGNUP HANDLER
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!formIsValid) {
      return;
    }
    // login state 일때 작동
    if (authFormCtx.isForLogin) {
      try {
        await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        }).then((res) => {
          if (res.error) {
            dispatch(
              uiActions.showNotification({
                message:
                  res.error ||
                  "Failed to sign in. Check your email, password input.",
              })
            );
          }
        });
        setLoading(false);
        authFormCtx.hideAuthForm();
      } catch (err) {
        dispatch(
          uiActions.showNotification({
            message: "Failed to log in.",
          })
        );
        setLoading(false);
      }
    } else {
      // Sign Up state일때 수행
      try {
        const response = await createUser(
          enteredName,
          enteredEmail,
          enteredPassword
        );
        if (!response.ok) {
          authFormCtx.hideAuthForm();
          throw new Error(response.message);
        }
        setLoading(false);
        authFormCtx.showLogin();
      } catch (err) {
        dispatch(
          uiActions.showNotification({
            message: err.message || "Failed to create a new account.",
          })
        );
        setLoading(false);
      }
    }

    resetPassword();
    resetEmail();
  };

  const switchAuthModeHandler = () => {
    authFormCtx.toggleLoginForm();
    resetEmail();
    resetPassword();
  };

  const authFormContent = (
    <div className="flex min-w-100 items-center justify-center py-12 px-6">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {authFormCtx.isForLogin ? "Sign In" : "Sign Up"}
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={submitHandler}
        >
          <div className="space-y-4 rounded-md">
            {!authFormCtx.isForLogin && (
              <div>
                <label htmlFor="username" className="sr-only">
                  Name
                </label>
                <AuthInput
                  id={"username"}
                  type={"text"}
                  placeholder={"Username"}
                  inputProps={nameInputProps}
                />
                {nameError && (
                  <p className="mt-1 text-pink-600 text-sm">
                    Please enter your username.
                  </p>
                )}
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <AuthInput
                id={"email"}
                type={"email"}
                placeholder="Email address"
                inputProps={emailInputProps}
              />
              {emailError && (
                <p className="mt-1 text-pink-600 text-sm">
                  Please provide a valid email address.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <AuthInput
                id={"password"}
                type={"password"}
                placeholder={"Password"}
                inputProps={passwordInputProps}
              />
              {passwordError && (
                <p className="mt-1 text-pink-600 text-sm">
                  Password must be at least 6 characters
                </p>
              )}
            </div>
          </div>

          <div>
            <LoginButton
              loading={loading}
              isForLogin={authFormCtx.isForLogin}
            />
            <div className="relative flex justify-center mt-2">
              <AuthModeToggler
                onToggle={switchAuthModeHandler}
                isForLogin={authFormCtx.isForLogin}
              />
            </div>
          </div>
          <span className={classes["border-line"]}>
            <p>OR</p>
          </span>
          <div className="flex justify-center space-x-6 pd-4">
            <PlatformLoginBtn platform={"kakao"} />
            <PlatformLoginBtn platform={"google"} />
          </div>
        </form>
      </div>
    </div>
  );

  return <Modal onClose={props.onClose}>{authFormContent}</Modal>;
}

{
  /* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div> */
}
