import React, { useEffect, useState } from "react";
import axios from "axios";
import NewPost from ".";
import Comments from "./Comments/index";
import CommentForm from "./Comments/CommentForm";

function DisplayPosts() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("Users"));
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/api/post/`, config);
      console.log(result.data);
      setData(result.data);
    };
    if (data.length === 0) {
      fetchData();
    }
  }, []);

  return (
    <div>
      <div className="post">
        <NewPost setPosts={setData} />
      </div>

      <section>
        {data.length === 0 ? (
          <p>Chargement</p>
        ) : (
          [...data].reverse().map((item) => (
            <article key={`article-${item.idPost}`} className="post-content">
              {item.image != "" && item.image != null ? (
                <div className="post-img">
                  <img src={item.image} alt="img" className="image__post" />
                </div>
              ) : null}{" "}
              <div className="post_item">
                <p>{item.message}</p>
                <p>{item.name}</p>
                <p>{item.date}</p>
              </div>
              <Comments data={item.comments} />
              <CommentForm data={item.idPost} />
            </article>
          ))
        )}
      </section>
    </div>
  );
}
export default DisplayPosts;
