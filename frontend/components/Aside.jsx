"use client";

import Link from "next/link";

import { IoHomeSharp } from "react-icons/io5";
import { SlUserFollowing } from "react-icons/sl";
import { FaUserFriends } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";

require("dotenv").config();

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

const Aside = () => {
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState("");
  const main_id = process.env.NEXT_PUBLIC_MAIN_ID;

  useEffect(() => {
    const fetchingData = async () => {
      const users = await axios.get(
        `http://localhost:3001/all_users/userId/${main_id}`
      );
      setProfile(users.data[0].profile_img);
      setUser(users.data[0].user_name);
    };

    fetchingData();
  }, []);

  return (
    <div className="text-white h-screen w-[200%] max-xl:flex max-xl:justify-center max-xl:border-r-[1px] max-xl:border-stone-500">
      <div>
        <ul className="space-y-3">
          <li>
            <Link
              href="/"
              className="flex items-center hover:bg-stone-600 py-3 rounded-md duration-200"
            >
              <span className="px-3">
                <IoHomeSharp size={25} />
              </span>
              <span className="max-xl:hidden">For You</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center hover:bg-stone-600 py-3 rounded-md duration-200"
            >
              <span className="px-3">
                <SlUserFollowing size={25} />
              </span>
              <span className="max-xl:hidden">Explore</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center hover:bg-stone-600 py-3 rounded-md duration-200"
            >
              <span className="px-3">
                <FaUserFriends size={25} />
              </span>
              <span className="max-xl:hidden">Following</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center hover:bg-stone-600 py-3 rounded-md duration-200"
            >
              <span className="px-3">
                <MdLiveTv size={25} />
              </span>
              <span className="max-xl:hidden">Friends</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center hover:bg-stone-600 py-3 rounded-md duration-200"
            >
              <span className="px-3">
                <FaRegCompass size={25} />
              </span>
              <span className="max-xl:hidden">LIVE</span>
            </Link>
          </li>
          <li>
            <Link
              href={`/user/${user}`}
              className="flex items-center hover:bg-stone-600 py-3 rounded-md space-x-2 duration-200"
            >
              <Image
                src={profile}
                width={25}
                height={25}
                alt="profile"
                className="mx-3"
              />
              <span className="max-xl:hidden">Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Aside;
