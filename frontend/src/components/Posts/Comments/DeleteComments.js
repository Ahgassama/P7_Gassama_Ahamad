import React from "react";
import axios from "axios";

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
          //document.location.reload();
          console.log(res);

          //setMessage("");
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
