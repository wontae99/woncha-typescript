import { ColorTheme } from "constants/color-theme";
import { TailSpin } from "react-loader-spinner";

const Backdrop = ({ children }) => {
  return (
    <span
      className={`fixed top-0 left-0 w-full h-full dark:bg-[${ColorTheme.darkBackGround}]`}
    >
      {children}
    </span>
  );
};

export default function PageLoader() {
  return (
    <Backdrop>
      <div className="fixed left-1/2 top-1/3 -translate-x-1/2 translate-y-1/2">
        <TailSpin
          height="55"
          width="55"
          color="#f54260"
          ariaLabel="tail-spin-loading"
          radius="1"
          visible={true}
          wrapperClass="self-center"
        />
        <p className="dark:text-white">Loading...</p>
      </div>
    </Backdrop>
  );
}
