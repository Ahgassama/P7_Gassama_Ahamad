import DeleteComment from "./DeleteComments";
import CommentForm from "./CommentForm";
import { useState } from "react";
import "./Comments.scss";
//Affichage de l'ensemble des commentaires d'un post
const Comment = (props) => {
  const userid = JSON.parse(localStorage.getItem("Users")).userid;
  const isAdmin = JSON.parse(localStorage.getItem("Users")).isAdmin;
  let [comments, setComments] = useState(props.data);
  console.log(comments);
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
      timeStyle: "short",
    };
    // return initial.toLocaleDateString("fr-FR", options); // sans timeStyle
    return Intl.DateTimeFormat("fr-FR", options2).format(initial);
  };
  return (
    <div>
      <div className="comment-container">
        <CommentForm post_idPost={props.postId} setComments={setComments} />
        <div className="comment-form">
          <ul>
            <li id="comment-title">Réagissez au Post!</li>
            {comments
              ? comments.map((com) => (
                  <li className="comment_style" key={`com-${com.idComment}`}>
                    <div className="comment-bubble">
                      <p className="comment-author"> </p> {com.surname} <br />
                      <p className="comment-message">{com.message}</p>{" "}
                      <p className="date-style">{formatDate(com.date)}</p>{" "}
                    </div>
                    {(userid === com.userid || isAdmin === 1) && (
                      <DeleteComment
                        idComment={com.idComment}
                        setComments={setComments}
                      />
                    )}
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
