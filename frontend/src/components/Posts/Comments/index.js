import React, { useState } from "react";
import CommentForm from "./CommentForm";
const Comment = (props) => {
  const [commentModal, setCommentModal] = useState(false);
  const handleModal = (e) => {
    if (e.target.id === "comment") {
      setCommentModal(true);
    }
  };
  return (
    <div>
      <div class="comment-container">
        <div class="comment-form">
          <ul>
            {props.data
              ? props.data.map((com) => (
                  <p key={`com-${com.idComment}`}>
                    {com.surname} {com.message}{" "}
                  </p>
                ))
              : null}
            <ul>
              <li onClick={handleModal} id="comment">
                Commentaire
              </li>

              {commentModal && <CommentForm />}
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Comment;
