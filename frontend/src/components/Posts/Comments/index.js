import React, { useState } from "react";
import DeleteComment from "./DeleteComments";

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
                  <li className="comment_style" key={`com-${com.idComment}`}>
                    {com.surname} <br />
                    {com.message} {com.date}{" "}
                    <DeleteComment idComment={com.idComment} />
                  </li>
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
