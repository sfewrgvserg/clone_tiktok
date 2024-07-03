"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiArrowBendDoubleUpRightBold } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";

require("dotenv").config();

const Page = ({ params }) => {
  const [user, setUser] = useState([]);
  const [like, setLike] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    const fetchingData = async () => {
      const param = params.id.replace("%40", "");
      const mainUser = await axios.get(
        `http://localhost:3001/all_users/${param}`
      );
      setUser(mainUser.data);

      if (mainUser.data.length > 0) {
        const allLike = await axios.get(
          `http://localhost:3001/all_likes/user/${mainUser.data[0].id}`
        );
        setLike(allLike.data);
        setTotalLikes(allLike.data.totalLikes);
      }
    };

    fetchingData();
  }, [params.id]);

  return (
    <div className="text-white text-sm p-5">
      {user.map((item, index) => (
        <div key={index} className="">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-10">
                <Image
                  className="rounded-full"
                  src={item.profile_img}
                  height={85}
                  width={85}
                  alt="user logo"
                />

                <div>
                  <h1 className="text-xl font-semibold">{item.user_name}</h1>
                  <div className="flex space-x-1">
                    <h3>{item.fist_name}</h3>
                    <h3>{item.last_name}</h3>
                  </div>
                  <button className="bg-rose-500 text-lg font-medium py-1 px-4 rounded-md hover:bg-rose-800 duration-200">
                    Follow
                  </button>
                </div>
              </div>

              <div className="flex">
                <PiArrowBendDoubleUpRightBold size={35} />
                <HiDotsVertical size={35} />
              </div>
            </div>

            <div>
              <div className="flex space-x-5 pb-2">
                <h2>
                  <span className="text-2xl font-bold">2</span> Following
                </h2>
                <h2>
                  <span className="text-2xl font-bold">1</span> Followers
                </h2>
                <h2>
                  <span className="text-2xl font-bold">{totalLikes}</span> likes
                </h2>
              </div>

              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
                veritatis dolor aspernatur tempore itaque nesciunt quisquam
                placeat eos perferendis, est vitae facilis labore nemo iusto
                quasi odit ipsum voluptatibus saepe!
              </div>
            </div>

            <div>
              <div>
                <h2 className="w-[15rem] pb-3 text-xl font-semibold border-b-2 border-gray-700">
                  <Link href="#" className="w-full flex justify-center">
                    Videos
                  </Link>
                </h2>
              </div>

              <div className="grid grid-cols-7 gap-5 max-2xl:grid-cols-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                {item.posts.map((Videos, index) => (
                  <div key={index}>
                    <Link
                      href={`/@${item.user_name.replace(" ", "_")}/video/${
                        Videos.id
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
                        <source src={Videos.media_file} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
