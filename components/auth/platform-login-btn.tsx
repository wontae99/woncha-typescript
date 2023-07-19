import Image from "next/image";
import { signIn } from "next-auth/react";

import kakao from "/public/images/buttons/kakao.png";
import google from "/public/images/buttons/google.png";

const PlatformLoginBtn = ({ platform }) => {
  const imgSrc = platform === "kakao" ? kakao : google;
  return (
    <button type="button" onClick={() => signIn(platform)}>
      <Image
        src={imgSrc}
        alt={`${platform} login btn`}
        width={50}
        height={50}
        quality={100}
      />
    </button>
  );
};

export default PlatformLoginBtn;
