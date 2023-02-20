import { ThreeDots } from "react-loader-spinner";

export default function DotLoader() {
  return (
    <ThreeDots
      height="33"
      width="33"
      radius="8"
      color="#fff"
      ariaLabel="three-dots-loading"
      visible={true}
    />
  );
}
