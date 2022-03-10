import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentForm from ".";

function DisplayComments() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("Users"));
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:3000/api/comment/`,
        config
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="comment">
        <CommentForm setComments={setData} />
      </div>

      <section>
        {data.map((item) => (
          <article key={item.id}>
            <div className="comment">
              <p>{item.message}</p>
              <p>{item.name}</p>
              <p>{item.date}</p>
              <input name="comment" id="comment" placeholder="Réagissez..." />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
export default DisplayComments;
