import React, { useEffect, useState } from "react";
import axios from "axios";
import NewPost from ".";
import Comments from "./Comments/index";
import CommentForm from "./Comments/CommentForm";
import DeletePost from "./DeletePost";
//import ModifyPost from "./ModifyPost";
import "./Posts.scss";
// import UpdatePost from "./UpdatePost";

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

      <section>
        {data.length === 0 ? (
          <p>Chargement</p>
        ) : (
          [...data].reverse().map((item) => (
            <article key={`article-${item.idPost}`} className="post-content">
              <div className="post_item">
                <p className="user-name">{item.name}</p>
                <p className="date">{formatDate(item.date)}</p>
              </div>
              <p className="post-msg">{item.message}</p>
              {item.image != "" && item.image != null ? (
                <div className="post-img">
                  <img src={item.image} alt="img" className="image__post" />
                </div>
              ) : null}{" "}
              <Comments data={item.comments} setComments={setData} />{" "}
              <div className="moderate_conteneur">
                {isAdmin === 1 ||
                  (userid === item.userId && (
                    <DeletePost idPost={item.idPost} setPosts={setData} />
                  ))}
              </div>
              <CommentForm post_idPost={item.idPost} setComments={setData} />
            </article>
          ))
        )}
      </section>
    </div>
  );
}
export default DisplayPosts;
// <UpdatePost post={item} setPosts={setData}>
/* useEffect(() => {
  const deleteData = async () => {
    const result = await  axios.get`http://localhost:3000/api/user/${
      JSON.parse(localStorage.getItem("Users")).userid
    }`;
    console.log(result.data);
   
  };
 
}, []);*/
/*   <input
                  type="submit"
                  id="modify"
                  onClick={handleModals}
                  value="Modifier"
                />{PostModal && <ModifyPost idPost={item.idPost} />}{" "}*/

/* const [postdel, setPostdel] = useState([]);
  useEffect(() => {
    const Attribute = async () => {
      const result = await axios.get`http://localhost:3000/api/user/${
        JSON.parse(localStorage.getItem("Users")).userid
      }`;
      console.log(result.data);
      const isAdmin = result.data.isAdmin;
      if (
        result.data.userid ===
          JSON.parse(localStorage.getItem("user")).userid ||
        isAdmin === 1
      ) {
        setPostdel(true);
      }
    };
    Attribute();
  }, []); */
