import { useRouter } from "next/router";

import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export default function BackButton() {
  const router = useRouter();
  const goBackHandler = () => {
    router.back();
  };

  return (
    <button type="button" onClick={goBackHandler}>
      <ArrowLeftIcon
        width={30}
        height={30}
        className="text-red-400 hover:text-red-500"
      />
    </button>
  );
}
