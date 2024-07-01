"use client";

import axios from "axios";
import { IoMdHeart } from "react-icons/io";
import { FaCommentAlt } from "react-icons/fa";
import { BsSave2Fill } from "react-icons/bs";
import { useEffect, useState } from "react";

import Image from "next/image";
import EnterComment from "@/components/EnterComment";

require("dotenv").config();

const Page = ({ params }) => {
  const [colorRose, setColorRose] = useState(false);
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(postData.likes?.length);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/all_posts/${params.id}`
        );
        const updatedPostData = await axios.get(
          `http://localhost:3001/all_posts/${params.id}`
        );
        const userList = await axios.get(`http://localhost:3001/all_users`);
        setListUser(userList.data);
        setPostData(response.data);
        setLikeCount(updatedPostData.data.likes.length);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchingData();
  }, [params.id]);

  const handleLike = async (userId, postId) => {
    try {
      await axios.post("http://localhost:3001/all_likes", {
        user_id: userId,
        post_id: postId,
      });
      const updatedPostData = await axios.get(
        `http://localhost:3001/all_posts/${postId}`
      );
      setColorRose(!colorRose);
      setLikeCount(updatedPostData.data.likes.length);
    } catch (error) {
      console.error("Error liking post:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!postData) {
    return <div>No data available</div>;
  }

  const calculateTimeDifference = (postDatetime) => {
    // Parse the MySQL datetime string into a JavaScript Date object
    const postDate = new Date(postDatetime);

    // Get the current time in milliseconds
    const now = Date.now();

    // Calculate the difference in milliseconds
    const differenceInMs = now - postDate.getTime();

    // Convert the difference to seconds
    const differenceInSeconds = Math.floor(differenceInMs / 1000);

    // Define thresholds and corresponding text
    const thresholds = [
      { limit: 60, text: "just now" },
      { limit: 3600, text: "a minute ago" }, // Up to 1 hour
      { limit: 3600 * 24, text: (hours) => `${hours} hours ago` }, // Up to 1 day
      { limit: 3600 * 24 * 2, text: "yesterday" }, // 2 days ago
    ];

    // Find the matching threshold
    for (const threshold of thresholds) {
      if (differenceInSeconds < threshold.limit) {
        return threshold.text;
      }
    }

    // Handle cases beyond thresholds (e.g., dates)
    const daysAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    return `${daysAgo} days ago`;
  };

  const main_id = process.env.NEXT_PUBLIC_MAIN_ID;

  return (
    <div>
      <div className="text-white flex text-xs px-5 justify-center">
        <div>
          <video
            loop
            autoPlay
            id="autoplay"
            controls
            aria-label="Video player"
            muted
            className="h-[55rem] rounded-xl py-5"
          >
            <source src={postData.media_file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="w-[45rem] py-5 space-y-2 px-2 overflow-auto h-[55rem] no-scrollbar pl-7">
          <div className="items-center text-sm bg-zinc-900 w-full rounded-xl px-2 justify-between">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Image
                  height={60}
                  width={60}
                  src={postData.user.profile_img}
                  className="rounded-full border-2 border-amber-200"
                  alt="firs alt"
                />

                <div>
                  <h1 className="text-lg font-medium">
                    {postData.user.user_name}
                  </h1>
                  <h3>{postData.created_datetime}</h3>
                </div>
              </div>

              <button className="bg-rose-500 text-lg font-medium py-1 px-4 rounded-md hover:bg-rose-800 duration-200">
                Follow
              </button>
            </div>

            <div className="flex pb-3 justify-between">
              <p>
                {showFullCaption
                  ? postData.caption
                  : postData.caption.slice(0, 130) +
                    (postData.caption.length > 130 ? " ..." : "")}
              </p>

              <button
                className="bg-zinc-700 font-medium text-sm px-3 rounded-xl hover:bg-zinc-800 duration-200"
                onClick={() => setShowFullCaption(!showFullCaption)}
              >
                {showFullCaption ? "Less" : "More"}
              </button>
            </div>
          </div>

          <div className="text-sm space-y-1 flex items-center space-x-3">
            <button
              className="rounded-full bg-stone-900 flex items-center flex-col justify-center w-[4rem] h-[4rem] duration-200 hover:bg-stone-900/50"
              onClick={() => handleLike(main_id, postData.id)}
            >
              <IoMdHeart
                size={25}
                className={`${colorRose ? "text-white" : "text-rose-900"}`}
              />
              {likeCount}
            </button>
            <button className="rounded-full bg-stone-900 flex items-center flex-col justify-center w-[4rem] h-[4rem] duration-200 hover:bg-stone-900/50">
              <FaCommentAlt size={20} />
              {postData.comments?.length || 0}
            </button>
            <button className="rounded-full bg-stone-900 flex items-center flex-col justify-center w-[4rem] h-[4rem] duration-200 hover:bg-stone-900/50">
              <BsSave2Fill size={20} />
              {postData.saves?.length || 0}
            </button>
          </div>

          <div>
            <h3 className="text-lg border-b-2 border-gray-600 flex justify-center py-3 cursor-pointer sticky top-0 bg-black">
              Comments ( {postData.comments.length} )
            </h3>

            <div>
              {postData.comments.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 py-2 ">
                  <div>
                    <Image
                      src={
                        listUser.find(
                          (user) => user.id === item.created_by_user_id
                        )?.profile_img
                      }
                      height={45}
                      width={45}
                      className="rounded-full border-2 border-indigo-400"
                      alt={index}
                    />
                  </div>

                  <div className="space-y-1 text-sm">
                    <h2 className="text-lg font-medium">
                      {
                        listUser.find(
                          (user) => user.id === item.created_by_user_id
                        )?.user_name
                      }
                    </h2>
                    <div className="w-[39rem]">
                      <h4>{item.comment}</h4>
                      <p>{calculateTimeDifference(item.created_datetime)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="fixed bottom-5">
              <EnterComment postData={postData.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
