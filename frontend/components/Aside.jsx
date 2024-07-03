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
  const main_id = process.env.NEXT_PUBLIC_MAIN_ID;

  useEffect(() => {
    const fetchingData = async () => {
      const users = await axios.get(
        `http://localhost:3001/all_users/userId/${main_id}`
      );
      console.log(users.data[0].user_name);
      setUser(users.data[0].user_name);
    };

    fetchingData();
  }, []);

  return (
    <div className="text-white h-screen w-[15rem]">
      <div>
        <ul>
          <li>
            <Link
              href="/"
              className="flex items-center hover:bg-stone-600 py-3 rounded-md duration-200"
            >
              <span className="px-3">
                <IoHomeSharp size={25} />
              </span>
              For You
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
              Explore
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
              Following
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
              Friends
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
              LIVE
            </Link>
          </li>
          <li>
            <Link
              href={`/user/${user}`}
              className="flex items-center hover:bg-stone-600 py-3 rounded-md duration-200"
            >
              <Image src="" /> Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Aside;
