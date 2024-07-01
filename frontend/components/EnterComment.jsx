import axios from "axios";
import { useState } from "react";
import { BsEmojiKiss } from "react-icons/bs";

require("dotenv").config();

const EnterComment = (postId) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && commentText.trim().length > 0) {
      postComment();
    }
  };

  const main_id = process.env.NEXT_PUBLIC_MAIN_ID;

  const postComment = async () => {
    const comment = commentText.trim();
    const created_by_user_id = main_id;
    const post_id = postId.postData;

    try {
      await axios.post("http://localhost:3001/all_comments", {
        comment,
        created_by_user_id,
        post_id,
      });
      // Clear the comment text after successful posting
      setCommentText("");
      // You might want to add some feedback to the user here, like a success message
    } catch (error) {
      console.error("Error posting comment:", error);
      // You might want to show an error message to the user here
    }
  };

  const isPostButtonEnabled = commentText.trim().length > 0;

  return (
    <div className="focus:outline-none ring-[1px] px-5 rounded-lg border-blue-500 z-50 bg-black">
      <div className="w-full text-white flex items-center">
        <input
          type="text"
          placeholder="Add Comment..."
          onChange={handleCommentChange}
          onKeyDown={handleKeyPress}
          className="w-[20rem] bg-black font-semibold text-sm px-3 py-3 border-none outline-none"
          value={commentText}
        />

        <div className="flex items-center space-x-5">
          <button className="hover:bg-gray-500 rounded-md duration-200 hover:text-black p-1">
            <BsEmojiKiss size={20} />
          </button>

          <button
            onClick={postComment}
            className={`font-semibold ${
              isPostButtonEnabled ? "text-rose-600" : "text-gray-500"
            }`}
            disabled={!isPostButtonEnabled}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterComment;
