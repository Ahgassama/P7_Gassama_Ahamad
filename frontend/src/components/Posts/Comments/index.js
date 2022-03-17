import DeleteComment from "./DeleteComments";
import "./Comments.scss";
const Comment = (props) => {
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
                    {com.message} <p className="date_style">{com.date}</p>{" "}
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
