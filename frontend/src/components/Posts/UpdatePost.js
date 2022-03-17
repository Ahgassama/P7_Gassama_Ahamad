import React, { useState } from "react";
import DeletePost from "./DeletePost";
import ModifyPost from "./ModifyPost";

const UpdatePost = ({ props }) => {
  console.log(props);
  const [PostModal, setPostModal] = useState(false);
  const handleModals = (e) => {
    if (e.target.id === "modify") {
      setPostModal(true);
    }
  };

  return (
    <div className="moderate_conteneur">
      <DeletePost idPost={props.idPost} />
      <input
        type="submit"
        id="modify"
        onClick={handleModals}
        value="Modifier"
      />
      {PostModal && <ModifyPost idPost={props.idPost} />}
    </div>
  );
};
export default UpdatePost;
