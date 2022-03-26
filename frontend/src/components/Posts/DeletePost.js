import React from "react";
import axios from "axios";
//fonction de suppression d'un post
const DeletePost = ({ idPost, setPosts }) => {
  const handledeletePost = (e) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer le post ?`)) return;
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
          setPosts((oldPosts) => {
            let posts = [...oldPosts];
            const index = posts.findIndex((post) => post.idPost === idPost);
            posts.splice(index, 1);
            return posts;
          });
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
