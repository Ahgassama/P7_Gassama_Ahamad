//import React, { useState, useEffect } from "react";
/*import React, { useState } from "react";
import axios from "axios";
import NewPost from ".";

const AffichagePosts = () => {
  return (
    <div className="post">
      <NewPost />
    </div>
  );
};

export default AffichagePosts;*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import NewPost from ".";

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
        <NewPost />
      </div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <p>{item.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default DisplayPosts;
