const commentCRUD = async (method, type, contentId, userId, commentData) => {
  if (method === "GET" && userId) {
    const res = await fetch(`/api/comments/${type}/${contentId}/${userId}`);
    const data = await res.json();

    return data;
  } else if (method === "GET") {
    const res = await fetch(`/api/comments/${type}/${contentId}`);
    const data = await res.json();

    return data;
  } else if (method === "POST") {
    try {
      const res = await fetch(`/api/comments/${type}/${contentId}/${userId}`, {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      new Error(err.message || "Failed to upload a new comment.");
    }
  } else if (method === "PATCH") {
    try {
      const res = await fetch(`/api/comments/${type}/${contentId}/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(commentData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err || "Failed to edit a comment.");
    }
  } else if (method === "DELETE") {
    try {
      const res = await fetch(`/api/comments/${type}/${contentId}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err.message || "Failed to delete a comment.");
    }
  }
};

export default commentCRUD;
