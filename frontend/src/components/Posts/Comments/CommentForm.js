import React, { useState } from "react";
import axios from "axios";
const CommentForm = (props) => {
  const [message, setMessage] = useState("");

  const handleCom = (e) => {
    const user = JSON.parse(localStorage.getItem("Users"));
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    e.preventDefault();

    axios({
      method: "POST",
      url: `http://localhost:3000/api/comment/`,
      data: {
        message,
      },
      config,
    })
      .then((res) => {
        if (res.data.error) {
          console.log(res);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div>
      <form action="" onSubmit={handleCom} id="comment-form">
        <label htmlFor="commentaire">Laissez un commentaire</label>
        <br />
        <input
          type="text"
          name="comment"
          id="comment"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          required
        />
        <br />

        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default CommentForm;
