import { useCallback, useContext, useState, memo } from "react";
import { useSession } from "next-auth/react";

import StarRating from "./star-rating";
import AuthFormContext from "../../store/auth-context";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const CommentForm = ({ addComment, onEdit }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const ctx = useContext(AuthFormContext);

  const onFocusHandler = () => {
    if (session) {
      return;
    }
    ctx.showAuthForm();
  };

  const [enteredText, setEnteredText] = useState("");
  const [checkedRating, setCheckedRating] = useState(null);

  const inputChangeHandler = (e) => {
    setEnteredText(e.target.value);
  };

  const getRating = useCallback(
    (rating) => {
      setCheckedRating(rating);
    },
    [setCheckedRating]
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    const date = new Date();
    const commentData = {
      comment: {
        rating: checkedRating,
        text: enteredText,
      },
      date,
    };
    const rating = commentData.comment.rating;
    if (!rating || rating === "undefined") {
      console.log("UM")
      dispatch(
        uiActions.showNotification({ message: "Please fill out rating!" })
      );

      return;
    }

    if (ctx.isEdit) {
      await onEdit(commentData);
    } else {
      await addComment(commentData);
    }

    setEnteredText("");
  };

  return (
    <form
      onSubmit={submitHandler}
      onFocus={onFocusHandler}
      className="space-y-4"
    >
      <StarRating getRating={getRating} />
      <div className="flex flex-col lg:flex-row justify-end gap-2">
        <label htmlFor="comment" className="hidden">
          Add a comment
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={3}
          cols={30}
          placeholder="Comment text is optional"
          onChange={inputChangeHandler}
          value={enteredText}
          className="w-full"
        />

        <button className="w-full lg:w-24 bg-blue-500 hover:bg-blue-400 text-white rounded-lg py-2">
          {ctx.isEdit ? "EDIT" : "SUBMIT"}
        </button>
      </div>
    </form>
  );
};

export default memo(CommentForm);
