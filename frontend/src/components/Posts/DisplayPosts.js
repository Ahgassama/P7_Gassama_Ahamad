import React, { useEffect, useState } from "react";
import axios from "axios";
import NewPost from ".";
import Comments from "./Comments/index";
import DeletePost from "./DeletePost";

import "./Posts.scss";
//Affichage des posts et des commentaires
function DisplayPosts() {
  const [data, setData] = useState([]);
  const userid = JSON.parse(localStorage.getItem("Users")).userid;
  const isAdmin = JSON.parse(localStorage.getItem("Users")).isAdmin;
  console.log(isAdmin);
  console.log(userid);

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

  const formatDate = (date) => {
    let initial = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const options2 = {
      dateStyle: "medium",
      timeStyle: "medium",
    };
    // return initial.toLocaleDateString("fr-FR", options); // sans timeStyle
    return Intl.DateTimeFormat("fr-FR", options2).format(initial);
  };

  return (
    <div>
      <div className="post">
        <NewPost setPosts={setData} />
      </div>

      <section className="post_list">
        {data.length === 0 ? (
          <p>Chargement</p>
        ) : (
          [...data].reverse().map((item) => (
            <article key={`article-${item.idPost}`} className="post-content">
              <div className="post_item">
                <p className="user-name">
                  {item.surname} {item.name}
                </p>
                <p className="date">{formatDate(item.date)}</p>
              </div>
              <p className="post-msg">{item.message}</p>
              {item.image != "" && item.image != null ? (
                <div className="post-img">
                  <img src={item.image} alt="img" className="image__post" />
                </div>
              ) : null}{" "}
              <Comments
                data={item.comments}
                setComments={setData}
                postId={item.idPost}
              />{" "}
              {(userid === item.userId || isAdmin === 1) && (
                <div className="moderate_conteneur">
                  <DeletePost idPost={item.idPost} setPosts={setData} />
                </div>
              )}
            </article>
          ))
        )}
      </section>
    </div>
  );
}
export default DisplayPosts;
