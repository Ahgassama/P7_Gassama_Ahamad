import React, { useState } from "react";
import axios from "axios";

const ModifyPost = ({ idPost }) => {
  const [message, setMessage] = useState("");
  const [image, setNewFile] = useState("");
  const onInputChange = (e) => {
    setNewFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const onMessageChange = (e) => {
    setMessage(e.target.value);
    console.log(e.target.value);
  };
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
  const handleModPost = (e) => {
    console.log(image);
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/post/${idPost}`, data, config)
      .then((res) => {
        if (res.data.errors) {
          console.log("pas de message");
        } else {
          console.log(res);
          //document.location.reload();
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div>
      <form
        action=""
        onSubmit={handleModPost}
        encType="multipart/form-data"
        className="post-form"
      >
        <input
          name="message"
          id="message"
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
        <input id="post-input" type="submit" value="Confirmer" />
      </form>
    </div>
  );
};

export default ModifyPost;
