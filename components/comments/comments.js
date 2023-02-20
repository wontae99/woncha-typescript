import { useCallback, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import commentCRUD from "../../lib/comment-util";

import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import MyComment from "./my-comment";

function Comments({ type, contentId }) {
  const [showCommentForm, setShowCommentForm] = useState(true);
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    commentCRUD("GET", type, contentId).then((data) => {
      setComments(data);
    });
  }, [refresh]);

  const showCommentFormHandler = useCallback(() => {
    setShowCommentForm((prevState) => !prevState);
  }, []);

  const addCommentHandler = async (commentData) => {
    const session = await getSession();
    await commentCRUD("POST", type, contentId, session.user.id, commentData);

    setRefresh(!refresh);
  };

  const editCommentHandler = async (commentData) => {
    const session = await getSession();
    await commentCRUD("PATCH", type, contentId, session.user.id, commentData);
    setRefresh(!refresh);
  };

  const deleteCommentHandler = async () => {
    const session = await getSession();
    await commentCRUD("DELETE", type, contentId, session.user.id);
    setRefresh(!refresh);
  };

  const setShowForm = (Boolean) => {
    setShowCommentForm(Boolean);
  };

  return (
    <div>
      <MyComment
        onShowForm={showCommentFormHandler}
        onDelete={deleteCommentHandler}
        setShowForm={setShowForm}
        content={{ type, contentId }}
        refresh={refresh}
      />
      {showCommentForm && (
        <CommentForm
          addComment={addCommentHandler}
          onEdit={editCommentHandler}
          refresh={refresh}
        />
      )}
      <CommentList comments={comments} />
    </div>
  );
}

export default Comments;
