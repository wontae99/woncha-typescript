import { TailSpin } from "react-loader-spinner";

const Backdrop = ({ children }) => {
  return (
    <span
      className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-[#18181b]`}
    >
      {children}
    </span>
  );
};

export default function PageLoader() {
  return (
    <Backdrop>
      <div className="screen-center">
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
