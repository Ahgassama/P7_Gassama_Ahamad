import React, { useState } from "react";

const Comment = (props) => {
  //const [commentModal, setCommentModal] = useState(false);
  /*const handleModal = (e) => {
    if (e.target.id === "comment") {
      setCommentModal(true);
    }
  };*/
  return (
    <div>
      <div className="comment-container">
        <div className="comment-form">
          <ul>
            <li id="comment">Commentaires</li>
            {props.data
              ? props.data.map((com) => (
                  <p key={`com-${com.idComment}`}>
                    {com.surname} {com.message} {com.date}{" "}
                  </p>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Comment;
//{commentModal} onClick={handleModal}
