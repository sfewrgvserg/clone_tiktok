"use client";

import Image from "next/image";
import axios from "axios";
import Loading from "./loading";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { IoMdHeart } from "react-icons/io";
import { FaCommentAlt } from "react-icons/fa";
import { BsSave2Fill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

export default function Post() {
  return (
    <main>
      <div>
        <Suspense fallback={<Loading />}>
          <VideoComponent />
        </Suspense>
      </div>
    </main>
  );
}

const VideoComponent = () => {
  const [colorRose, setColorRose] = useState(false);
  const [postData, setPostData] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [followStatus, setFollowStatus] = useState({});

  useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/all_posts");
      setPostData(response.data);
      const initialLikeCounts = {};
      const initialFollowStatus = {};
      response.data.forEach((post) => {
        initialLikeCounts[post.id] = post.likes.length;
        initialFollowStatus[post.user.id] = false;
      });
      setLikeCounts(initialLikeCounts);
      setFollowStatus(initialFollowStatus);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
      setLikeCounts((prev) => ({
        ...prev,
        [postId]: updatedPostData.data.likes.length,
      }));
    } catch (error) {
      console.error("Error liking post:", error.message);
    }
  };

  const handleFollow = (userId) => {
    setFollowStatus((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <section>
      <div className="w-full h-full text-white">
        {postData.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center space-x-5"
          >
            <Link
              href={`/@${item.user.user_name.replace(" ", "_")}/video/${
                item.id
              }`}
            >
              <video
                loop
                autoPlay
                id="autoplay"
                controls
                aria-label="Video player"
                muted
                className="h-[55rem] rounded-xl py-5"
              >
                <source src={item.media_file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Link>

            <div className="text-sm space-y-1 flex flex-col items-center">
              <div className="relative cursor-pointer">
                <Image
                  className="rounded-full"
                  src={item.user.profile_img}
                  height={55}
                  width={55}
                  alt="hero image"
                />
                <div
                  onClick={() => handleFollow(item.user.id)}
                  className="absolute -bottom-2 right-1/4 p-2 bg-rose-700 font-bold rounded-full"
                >
                  {followStatus[item.user.id] ? <FaCheck /> : <FaPlus />}
                </div>
              </div>

              <button
                onClick={() => handleLike(item.user.id, item.id)}
                className="rounded-full bg-black hover:bg-white/30 duration-200 flex items-center flex-col justify-center w-[5rem] h-[5rem]"
              >
                <IoMdHeart
                  size={25}
                  className={`${colorRose ? "text-rose-900" : "text-white"}`}
                />
                {likeCounts[item.id] || 0}
              </button>
              <Link
                href={`/@${item.user.user_name.replace(" ", "_")}/video/${
                  item.id
                }`}
              >
                <button className="rounded-full bg-black hover:bg-white/30 duration-200 flex items-center flex-col justify-center w-[5rem] h-[5rem]">
                  <FaCommentAlt size={25} />
                  {item.comments.length}
                </button>
              </Link>
              <button className="rounded-full bg-black hover:bg-white/30 duration-200 flex items-center flex-col justify-center w-[5rem] h-[5rem]">
                <BsSave2Fill size={25} />
                {item.saves.length}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
