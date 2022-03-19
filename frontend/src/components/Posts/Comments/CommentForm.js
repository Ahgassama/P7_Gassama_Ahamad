import React, { useState } from "react";
import axios from "axios";
import "./Comments.scss";
const CommentForm = ({ post_idPost, props }) => {
  const [message, setMessage] = useState("");

  const handleCom = (e) => {
    console.log(message);
    console.log(post_idPost);
    const user = JSON.parse(localStorage.getItem("Users"));
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    };
    e.preventDefault();

    /*axios({
      method: "POST",
      url: `http://localhost:3000/api/comment/`,
      data: {
        message: message,
        post_idPost: idPost,
      },
      config,
    })*/
    axios
      .post(
        `http://localhost:3000/api/comment/`,
        { message, post_idPost },
        config
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res);
        } else {
          console.log(res);
          //document.location.reload();
          props.setComment((oldComments) => [res.data.comment, ...oldComments]);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="comment-conteneur">
      <form action="" onSubmit={handleCom} id="comment-form">
        <br />
        <input
          type="text"
          name="comment"
          id="comment"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Ecrire un commentaire..."
          required
        />
        <br />

        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default CommentForm;
