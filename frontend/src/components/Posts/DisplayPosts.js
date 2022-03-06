import React, { useEffect, useState } from "react";
import axios from "axios";
import NewPost from ".";
import NewPic from ".";

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
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="post">
        <NewPost setPosts={setData} />
      </div>

      <section>
        {data.map((item) => (
          <article key={item.id}>
            <div className="post">
              <p>{item.message}</p>
              <p>{item.name}</p>
              <p>{item.date}</p>
              <p>{item.image}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
export default DisplayPosts;
