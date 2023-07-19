import { Fragment } from "react";

export default function RateTag() {
  return (
    <Fragment>
      <div className="hidden text-xl peer-checked/worst:block text-gray-500">
        Worst Ever
      </div>
      <div className="hidden text-xl peer-checked/sucks-big:block text-gray-500">
        Sucks big time
      </div>
      <div className="hidden text-gray-500 text-xl peer-checked/sucks:block">
        Sucks
      </div>
      <div className="hidden text-gray-500 text-xl peer-checked/bad:block">
        Kinda bad
      </div>
      <div className="hidden text-gray-500 text-xl peer-checked/meh:block">
        Meh
      </div>
      <div className="hidden text-gray-500 text-xl peer-checked/soso:block">
        So So
      </div>
      <div className="hidden text-gray-500 text-xl peer-checked/not-bad:block">
        Not bad
      </div>
      <div className="hidden text-gray-500 text-xl peer-checked/good:block">
        Pretty good
      </div>
      <div className="hidden text-gray-500 text-xl peer-checked/nice:block">
        Nice one
      </div>
      <div className="hidden text-gray-500 text-xl peer-checked/awesome:block">
        Awesome
      </div>
    </Fragment>
  );
}
