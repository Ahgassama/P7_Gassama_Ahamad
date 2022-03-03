import React, { useState } from "react";
import axios from "axios";

const NewPost = () => {
  const [content, setMessage] = useState([]);
  const handlePost = (e) => {
    console.log(content);
    const user = JSON.parse(localStorage.getItem("Users"));
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    };

    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/post/`, content, config)
      .then((res) => {
        if (res.data.errors) {
          console.log("pas de message");
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <form onSubmit={handlePost}>
      <input
        name="message"
        id="message"
        placeholder="Ecrivez à vos collègues..."
        onChange={(e) => setMessage(e.target.value)}
        value={content}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};
export default NewPost;
