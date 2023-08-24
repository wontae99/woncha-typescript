const AuthModeToggler = ({ onToggle, isForLogin }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 hover:underline underline-offset-1"
    >
      {isForLogin
        ? "Create new account"
        : "Login with existing account"}
    </button>
  );
};

export default AuthModeToggler;