import DeleteComment from "./DeleteComments";
import "./Comments.scss";
const Comment = (props) => {
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
      <div className="comment-container">
        <div className="comment-form">
          <ul>
            <li id="comment">Commentaires</li>
            {props.data
              ? props.data.map((com) => (
                  <li className="comment_style" key={`com-${com.idComment}`}>
                    {com.surname} <br />
                    {com.message}{" "}
                    <p className="date_style">{formatDate(com.date)}</p>{" "}
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
