import { getSession } from "next-auth/react";
import { useState, useContext, useEffect } from "react";
import commentCRUD from "../../lib/comment-util";
import AuthFormContext from "../../store/auth-context";

import CommentListItem from "./comment-list-item";

function MyComment({ onShowForm, onDelete, setShowForm, content, refresh }) {
  const { type, contentId } = content;
  const [myComment, setMyComment] = useState([]);
  const { setIsEdit, setIsAdd } = useContext(AuthFormContext);

  async function myFunction() {
    const session = await getSession();
    return session;
  }

  useEffect(() => {
    myFunction().then((session) => {
      if (session) {
        const userId = session.user.id;
        commentCRUD("GET", type, contentId, userId).then((data) => {
          if (data.length > 0) {
            setMyComment(data);
            setShowForm(false);
            setIsEdit();
          } else {
            setMyComment([]);
            setShowForm(true);
            setIsAdd();
          }
        });
      } else {
        setIsAdd();
        setShowForm(true);
      }
    });
  }, [refresh]);

  return myComment.length > 0 ? (
    <ul>
      {myComment.map((comment) => (
        <CommentListItem
          key={comment._id}
          comment={comment}
          isMine={true}
          onShowForm={onShowForm}
          onDelete={onDelete}
        />
      ))}
    </ul>
  ) : (
    ""
  );
}
export default MyComment;
