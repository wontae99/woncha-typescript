import { LockClosedIcon } from "@heroicons/react/20/solid";
import DotLoader from "../ui/dot-loader";

const LoginButton = ({ loading, isForLogin }) => {
  return (
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
      {loading ? <DotLoader /> : isForLogin ? "Sign in" : "Sign up"}
    </button>
  );
};

export default LoginButton;
