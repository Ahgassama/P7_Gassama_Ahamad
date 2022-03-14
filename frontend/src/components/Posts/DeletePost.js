import React from "react";
import axios from "axios";

const DeletePost = ({ idPost }) => {
  const handledeletePost = (e) => {
    console.log(idPost);
    const user = JSON.parse(localStorage.getItem("Users"));
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    };

    e.preventDefault();
    axios
      .delete(`http://localhost:3000/api/post/${idPost}`, config)
      .then((res) => {
        if (res.data.errors) {
          console.log("pas de message");
        } else {
          console.log(res);
          document.location.reload();
          //setMessage("");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <form onSubmit={handledeletePost} className="post-form">
      <input id="post-input" type="submit" value="Supprimer" />
    </form>
  );
};
export default DeletePost;
