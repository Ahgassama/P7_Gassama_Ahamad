import React, { useState } from "react";
import axios from "axios";

const NewPost = (props) => {
  const [message, setMessage] = useState([]);
  const [image, setNewFile] = useState("");
  const onInputChange = (e) => {
    setNewFile(e.target.files[0]);
  };
  const handlePost = (e) => {
    console.log(message);
    const user = JSON.parse(localStorage.getItem("Users"));
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    };
    const data = new FormData();
    data.append("image", image);
    data.append("message", message);

    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/post/`, { data }, config)
      .then((res) => {
        if (res.data.errors) {
          console.log("pas de message");
        } else {
          console.log(res);
          props.setPosts((oldPosts) => [res.data.post, ...oldPosts]);
          //setMessage("");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <form
      action="/"
      method="post"
      enctype="multipart/form-data"
      onSubmit={handlePost}
    >
      <input
        name="message"
        id="message"
        placeholder="Ecrivez à vos collègues..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <br />
      <input
        name="image"
        type="file"
        id="image"
        accept=".jpg, .jpeg, .png, .gif"
        onChange={onInputChange}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};
export default NewPost;
