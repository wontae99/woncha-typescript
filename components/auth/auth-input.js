const AuthInput = ({ id, type, placeholder, inputProps }) => {
  let inputClasses =
    "peer relative block w-full appearance-none rounded border border-gray-200 px-2 pt-2 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm";

  function inputClassNames(hasError) {
    let inputClass;
    inputClass = hasError
      ? " text-pink-600 bg-pink-100"
      : " text-gray-900 bg-indigo-50";
    return inputClasses + inputClass;
  }

  return (
    <input
      id={id}
      name={id}
      type={type}
      autoComplete={type === "password" ? "current-password" : type}
      className={inputClassNames(inputProps.hasError)}
      placeholder={placeholder}
      onChange={inputProps.inputChangeHandler}
      onBlur={inputProps.inputBlurHandler}
      value={inputProps.value}
    />
  );
};

export default AuthInput;
