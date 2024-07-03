"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

require("dotenv").config();

const Liked = ({ userId }) => {
  const main_id = process.env.NEXT_PUBLIC_MAIN_ID;

  const [userLiked, setUserLiked] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      const user = await axios.get(
        `http://localhost:3001/all_likes/likedUser/${userId}`
      );
      setUserLiked(user.data);
    };

    fetchingData();
  }, []);

  return (
    <div>
      <div className="absolute grid grid-cols-7 gap-5 max-2xl:grid-cols-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {userLiked.map((item, index) => (
          <div key={index}>
            <Link
              href={`/@${item.user.user_name.replace(" ", "_")}/video/${
                item.post_id
              }`}
            >
              <video
                loop
                autoPlay
                id="autoplay"
                controls
                aria-label="Video player"
                muted
                className="rounded-xl py-5"
              >
                <source src={item.post.media_file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Liked;
