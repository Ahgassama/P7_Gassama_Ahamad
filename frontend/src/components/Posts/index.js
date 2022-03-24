import React, { useState } from "react";
import axios from "axios";

const NewPost = (props) => {
  const [message, setMessage] = useState([]);
  const [image, setNewFile] = useState("");
  const onInputChange = (e) => {
    setNewFile(e.target.files[0]);
  };
  const onMessageChange = (e) => {
    setMessage(e.target.value);
    console.log(e.target.value);
  };
  const handlePost = (e) => {
    console.log(message);
    const user = JSON.parse(localStorage.getItem("Users"));
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const data = new FormData();
    data.append("message", message);
    data.append("image", image);

    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/post/`, data, config)
      .then((res) => {
        if (res.data.errors) {
          console.log("pas de message");
        } else {
          console.log(res);
          props.setPosts((oldPosts) => [...oldPosts, res.data.post]);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <form
      onSubmit={handlePost}
      encType="multipart/form-data"
      className="post-form"
    >
      <input
        name="message"
        id="message"
        placeholder="Ecrivez à vos collègues..."
        onChange={onMessageChange}
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
      <input id="post-input" type="submit" value="Envoyer" />
    </form>
  );
};
export default NewPost;
/*setPosts((oldPosts) => {
            let posts = [res.data.post, ...oldPosts];
            const index = posts.findIndex((post) => post.idPost === idPost);
            posts.push(index, 1);
            return posts;
          }); */
