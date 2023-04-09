import React from "react";

const CommentBox = ({comment,setComment}) => {
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  return (
    <div className="mt-4">
      <label htmlFor="comment" className="block font-medium mb-1">
        Comment
      </label>
      <textarea
        id="comment"
        className="border rounded-md p-2 w-full"
        rows="2"
        value={comment}
        onChange={handleCommentChange}
      />
    </div>
  );
};

export default CommentBox;
