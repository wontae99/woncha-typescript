import { useState } from "react";

type inputType = "name" | "email" | "password"

const useInput = (inputType: inputType) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  let enteredInputIsValid: boolean;
  const enNumRegExp = /[a-zA-Z0-9]/;
  const koEnNumRegExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

  if (inputType === "name") {
    enteredInputIsValid =
      enteredInput.trim().length > 1 && koEnNumRegExp.test(enteredInput);
  } else if (inputType === "email") {
    enteredInputIsValid =
      enteredInput.trim() !== "" && enteredInput.includes("@");
  } else if (inputType === "password") {
    enteredInputIsValid =
      enteredInput.trim().length > 5 && enNumRegExp.test(enteredInput);
  }

  const hasError = !enteredInputIsValid && isTouched;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredInput(e.target.value);
  };

  const inputBlurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredInput("");
    setIsTouched(false);
  };

  return {
    inputChangeHandler,
    inputBlurHandler,
    value: enteredInput,
    hasError,
    isValid: enteredInputIsValid,
    reset,
  };
};

export default useInput;
