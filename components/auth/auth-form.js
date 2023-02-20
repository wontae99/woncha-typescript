import { useContext, useState } from "react";
import useInput from "../hooks/use-input";
import { signIn } from "next-auth/react";
import { createUser } from "../../lib/auth-util";
import Image from "next/image";
import kakao from "/public/images/buttons/kakao.png";
import google from "/public/images/buttons/google.png";

import { LockClosedIcon } from "@heroicons/react/20/solid";
import Modal from "../ui/modal";
import DotLoader from "../ui/dot-loader";
import classes from "./border-line.module.css";
import AuthFormContext from "../../store/auth-context";

export default function AuthForm(props) {
  const [loading, setLoading] = useState(false);
  const authFormCtx = useContext(AuthFormContext);

  const {
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    value: enteredPassword,
    hasError: passwordError,
    isValid: passwordIsValid,
    reset: resetPassword,
  } = useInput("password");

  const {
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    value: enteredEmail,
    hasError: emailError,
    isValid: emailIsValid,
    reset: resetEmail,
  } = useInput("email");

  const {
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    value: enteredName,
    hasError: nameError,
    isValid: nameIsValid,
  } = useInput("name");

  let formIsValid = false;

  formIsValid = enteredName
    ? emailIsValid && passwordIsValid && nameIsValid
    : emailIsValid && passwordIsValid;

  let inputClasses =
    "peer relative block w-full appearance-none rounded border border-gray-200 px-2 pt-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm";

  function inputClassNames(hasError) {
    let inputClass;
    inputClass = hasError
      ? " text-pink-600 bg-pink-100"
      : " text-gray-900 bg gray-100";
    return inputClasses + inputClass;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!formIsValid) {
      return;
    }

    if (authFormCtx.isForLogin) {
      try {
        const result = await signIn("credentials", {
          redirect: true,
          email: enteredEmail,
          password: enteredPassword,
        });
        console.log(result);
        setLoading(false);
        authFormCtx.hideAuthForm();
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      try {
        const result = await createUser(
          enteredName,
          enteredEmail,
          enteredPassword
        );
        console.log(result);
        setLoading(false);
        authFormCtx.showLogin();
      } catch (err) {
        console.log(err);
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
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="space-y-4 rounded-md">
            {!authFormCtx.isForLogin && (
              <div>
                <label htmlFor="username" className="sr-only">
                  Name
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  className={inputClassNames(nameError)}
                  placeholder="Username"
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  value={enteredName}
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
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                className={inputClassNames(emailError)}
                placeholder="Email address"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
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
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={inputClassNames(passwordError)}
                placeholder="Password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
              />
              {passwordError && (
                <p className="mt-1 text-pink-600 text-sm">
                  Password must be at least 6 characters
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
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
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex justify-center mt-3 text-lg font-semibold
          bg-gray-800 w-full text-white rounded-lg
          px-6 py-3 block shadow-xl hover:text-white hover:bg-gray-700"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              {loading ? (
                <DotLoader />
              ) : authFormCtx.isForLogin ? (
                "Sign in"
              ) : (
                "Sign up"
              )}
            </button>
            <div className="relative flex justify-center mt-2">
              <button
                type="button"
                onClick={switchAuthModeHandler}
                className="text-gray-500 hover:text-gray-800 hover:underline underline-offset-1"
              >
                {authFormCtx.isForLogin
                  ? "Create new account"
                  : "Login with existing account"}
              </button>
            </div>
          </div>
          <span className={classes["border-line"]}>
            <p>OR</p>
          </span>
          <div className="flex justify-center space-x-6 pd-4">
            <button type="button" onClick={() => signIn("kakao")}>
              <Image
                src={kakao}
                alt="kakao login btn"
                width={50}
                height={50}
                quality={100}
              />
            </button>
            <button type="button" onClick={() => signIn("kakao")}>
              <Image
                src={google}
                alt="google login btn"
                width={50}
                height={50}
                quality={100}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return <Modal onClose={props.onClose}>{authFormContent}</Modal>;
}
