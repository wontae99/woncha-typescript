import { TailSpin } from "react-loader-spinner";

export default function PageLoader() {
  return (
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
  );
}
