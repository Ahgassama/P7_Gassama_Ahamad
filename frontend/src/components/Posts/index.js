import React, { useState } from "react";
import axios from "axios";

/*const GET_POSTS = "GET_POSTS";

 const GET_POST_ERRORS = "GET_POST_ERRORS";

 const addPost = (data) => {
    return (dispatch) => {
      return axios
        .post(`http://localhost:3000/api/post/`, data)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
          } else {
            dispatch({ type: GET_POST_ERRORS, payload: "" });
          }
        });
    };
  };*/
const NewPost = ({ onPost }) => {
  const [message, setMessage] = useState("");
  const handlePost = (e) => {
    console.log("handle");
    const user = JSON.parse(localStorage.getItem("Users"));
    const config = {
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    };
    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/post/`, message, config)
      .then((res) => {
        if (res.data.errors) {
          console.log("pas de message");
        } else {
          document.getElementById("message").innerHTML = message;
          //localStorage.setItem("Post", JSON.stringify(res.data));
          // const data = new FormData();
          // data.append("message", message);
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <form className="post" onSubmit={handlePost}>
      <textarea
        name="message"
        id="message"
        placeholder="Ecrivez à vos collègues..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};
export default NewPost;
