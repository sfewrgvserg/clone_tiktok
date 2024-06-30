import axios from "axios";

import Loading from "./loading";

import Link from "next/link";

import { Suspense } from "react";

import { IoMdHeart } from "react-icons/io";
import { FaCommentAlt } from "react-icons/fa";
import { BsSave2Fill } from "react-icons/bs";

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

const VideoComponent = async () => {
  const fetchingData = async () => {
    const video = await axios.get("http://localhost:3001/all_posts");
    return video.data;
  };

  let postData = await fetchingData();

  return (
    <selection>
      <div className="w-full h-full text-white">
        {postData.map((item, index) => (
          <Link
            href={`/video/@${item.user.user_name.replace(" ", "_")}/${item.id}`}
            key={index}
          >
            <div className="flex justify-center items-center space-x-5">
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

              <div className="text-sm space-y-1">
                <button className="rounded-full bg-black hover:bg-white/30 duration-200 flex items-center flex-col justify-center w-[5rem] h-[5rem]">
                  <IoMdHeart size={25} />
                  {item.likes.length === 0 ? "0" : `${item.likes.length}`}
                </button>
                <button className="rounded-full bg-black hover:bg-white/30 duration-200 flex items-center flex-col justify-center w-[5rem] h-[5rem]">
                  <FaCommentAlt size={25} />
                  {item.comments.length}
                </button>
                <button className="rounded-full bg-black hover:bg-white/30 duration-200 flex items-center flex-col justify-center w-[5rem] h-[5rem]">
                  <BsSave2Fill size={25} />
                  {item.saves.length}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </selection>
  );
};
