import React, { useState } from "react";
import axios from "axios";

const NewPost = (props) => {
  const [message, setMessage] = useState([]);
  const [image, setNewPic] = useState([]);
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
    console.log(data);

    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/post/`, { message }, { data }, config)
      .then((res) => {
        if (res.data.errors) {
          console.log("pas de message");
        } else {
          console.log(res);
          props.setPosts((oldPosts) => [res.data.post, ...oldPosts]);
          //setMessage("");
          //setNewPic(URL.createObjectURL(e.target.files[0]));
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
        value={message}
      />
      <br />
      <input
        name="imageUrl"
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        onChange={(e) => {
          setNewPic(e.target.files[0]);
        }}
      />

      <input type="submit" value="Envoyer" />
    </form>
  );
};
export default NewPost;
