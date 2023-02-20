import { useEffect, useRef, useState, memo } from "react";

import RateTag from "./rate-tag";
import classes from "./star-rating.module.css";

function StarRating({ getRating }) {
  const fieldsetRef = useRef();
  useEffect(() => {
    const ratings = document.querySelectorAll("input[name=rating]");
    const array = [];

    for (let i = 0; i < ratings.length; i++) {
      array[i] = false;
      // create event handler onClick
      ratings[i].addEventListener("click", function () {
        //if item has checked before
        if (array[i] == true) {
          ratings[i].checked = false;
          array[i] = false;
          return; // return or will set to ture value
        }
        // set to true.
        array[i] = true;
      });
    }
  }, [fieldsetRef]);

  const [value, setValue] = useState(null);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    getRating(value);
  }, [value]);

  return (
    <div className="flex justify-center text-center">
      <fieldset
        className={classes.rating}
        ref={fieldsetRef}
        onChange={changeHandler.bind()}
      >
        <input
          className="peer/awesome"
          type="radio"
          id="star5"
          name="rating"
          value="5"
        />
        <label
          className="full"
          htmlFor="star5"
          title="Awesome - 5 stars"
        ></label>

        <input
          className="peer/nice"
          type="radio"
          id="star4half"
          name="rating"
          value="4.5"
        />
        <label
          className={classes.half}
          htmlFor="star4half"
          title="Nice one - 4.5 stars"
        ></label>

        <input
          className="peer/good"
          type="radio"
          id="star4"
          name="rating"
          value="4"
        />
        <label
          className="full"
          htmlFor="star4"
          title="Pretty good - 4 stars"
        ></label>

        <input
          className="peer/not-bad"
          type="radio"
          id="star3half"
          name="rating"
          value="3.5"
        />
        <label
          className={classes.half}
          htmlFor="star3half"
          title="Not bad - 3.5 stars"
        ></label>

        <input
          className="peer/soso"
          type="radio"
          id="star3"
          name="rating"
          value="3"
        />
        <label className="full" htmlFor="star3" title="So So - 3 stars"></label>

        <input
          className="peer/meh"
          type="radio"
          id="star2half"
          name="rating"
          value="2.5"
        />
        <label
          className={classes.half}
          htmlFor="star2half"
          title="Meh - 2.5 stars"
        ></label>

        <input
          className="peer/bad"
          type="radio"
          id="star2"
          name="rating"
          value="2"
        />
        <label
          className="full"
          htmlFor="star2"
          title="Kinda bad - 2 stars"
        ></label>

        <input
          className="peer/sucks"
          type="radio"
          id="star1half"
          name="rating"
          value="1.5"
        />
        <label
          className={classes.half}
          htmlFor="star1half"
          title="Sucks - 1.5 stars"
        ></label>

        <input
          className="peer/sucks-big"
          type="radio"
          id="star1"
          name="rating"
          value="1"
        />
        <label
          className="full"
          htmlFor="star1"
          title="Sucks big time - 1 star"
        ></label>

        <input
          className="peer/worst"
          type="radio"
          id="starhalf"
          name="rating"
          value="0.5"
        />
        <label
          className={classes.half}
          htmlFor="starhalf"
          title="Worst ever - 0.5 stars"
        ></label>
        <RateTag />
      </fieldset>
    </div>
  );
}

export default StarRating;
