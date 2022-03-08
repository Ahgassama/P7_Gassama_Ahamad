import axios from "axios";
import React from "react";

const PostPic = () => {
  const image = new FormData();
  const user = JSON.parse(localStorage.getItem("Users"));
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };
  const onFileChange = (e) => {
    console.log(e.targer.files[0]);
    if (e.target && e.target.file[0]) {
      image.append("file", e.target.file[0]);
    }
  };
  const SubmitFileData = () => {
    axios
      .post(`http://localhost:3000/api/post/`, { image }, config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form>
      <input
        className="form-input"
        type="file"
        id="file-upload"
        name="file"
        accept=".jpg, .jpeg, .png, .gif"
        onChange={onFileChange}
      />
      <br />
      <button onClick={SubmitFileData}>submit</button>
    </form>
  );
};

export default PostPic;
