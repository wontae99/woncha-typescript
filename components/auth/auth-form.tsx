import { useContext, useState } from "react";
//AUTH
import { signIn } from "next-auth/react";
import { createUser } from "@/lib/auth-util";
// HOOK
import useInput from "../hooks/use-input";
import { useAppDispatch } from "../hooks/redux-hooks";
// CONTEXT
import AuthFormContext from "@/store/auth-context";
import { uiActions } from "@/store/ui-slice";
// COMPONENTS
import PlatformLoginBtn from "./platform-login-btn";
import LoginButton from "./login-button";
import AuthModeToggler from "./auth-mode-toggler";
import AuthInput from "./auth-input";
import Modal from "../ui/modal";

export default function AuthForm(props) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { status, hideAuthForm, toggleLoginForm } = useContext(AuthFormContext);

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
    if (status === "signin") {
      try {
        await signIn("credentials", {
          redirect: true,
          email: enteredEmail,
          password: enteredPassword,
        });
        setLoading(false);
        hideAuthForm();
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
          hideAuthForm();
          throw new Error(response.message);
        }
        setLoading(false);
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
    toggleLoginForm();
    resetEmail();
    resetPassword();
  };

  const authFormContent = (
    <div className="flex min-w-100 items-center justify-center py-12 px-6 bg-white dark:bg-[#18181b]">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            {status === "signin" ? "Sign In" : "Sign Up"}
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={submitHandler}
        >
          <div className="space-y-4 rounded-md">
            {status === "signup" && (
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
            <LoginButton loading={loading} isForLogin={status === "signin"} />
            <div className="relative flex justify-center mt-2">
              <AuthModeToggler
                onToggle={switchAuthModeHandler}
                isForLogin={status === "signin"}
              />
            </div>
          </div>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px my-8 bg-gray-300 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 -translate-x-1/2 left-1/2 bg-white dark:bg-[#18181b] font-medium text-gray-900 dark:text-white">
              or
            </span>
          </div>
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
