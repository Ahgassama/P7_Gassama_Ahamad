import React from "react";
import axios from "axios";

const UpdatePost = ({ idPost }) => {
  const handleUpdatePost = (e) => {
    if (!window.confirm(`Voulez-vous vraiment modifier le post ?`)) return;
    console.log(idPost);
    const user = JSON.parse(localStorage.getItem("Users"));
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    };

    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/post/${idPost}`, config)
      .then((res) => {
        if (res.data.errors) {
          console.log("pas de message");
        } else {
          document.location.reload();
          console.log(res);

          //setMessage("");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <form onSubmit={handleUpdatePost} className="post-form">
      <input id="post-input" type="submit" value="Supprimer" />
    </form>
  );
};
export default UpdatePost;
