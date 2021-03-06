import React from "react";
import axios from "axios";
//fonction de suppression d'un commentaire
const DeleteComment = ({ idComment, setComments }) => {
  const handledeleteComment = (e) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer ce commentaire ?`))
      return;
    console.log(idComment);
    const user = JSON.parse(localStorage.getItem("Users"));
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    };

    e.preventDefault();
    axios
      .delete(`http://localhost:3000/api/comment/${idComment}`, config)
      .then((res) => {
        if (res.data.errors) {
          console.log("pas de message");
        } else {
          console.log(res);

          setComments((oldComments) => {
            let comments = [...oldComments];
            const index = comments.findIndex(
              (com) => com.idComment === idComment
            );
            comments.splice(index, 1);
            return comments;
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <form onSubmit={handledeleteComment} className="comment-form">
      <input id="comment-input" type="submit" value="Supprimer" />
    </form>
  );
};
export default DeleteComment;
/*   setComments((oldComments) => {
            let comments = [...oldComments];
            const index = comments.findIndex(
              (comment) => comment.idComment === idComment
            );
            comments.splice(index, 1);
            return comments;
          });*/
