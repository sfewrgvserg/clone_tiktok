import Image from "next/image";
import Link from "next/link";

import logo_tiktok from "@/public/image/user_logo/Tiktok-Logo-Black-and-White.png";

import Search from "./Search";

import { GrSend } from "react-icons/gr";
import { TbInbox } from "react-icons/tb";
import { CiSquarePlus } from "react-icons/ci";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-5 px-3 sticky bg-black z-50 top-0">
      <div>
        <Link href="/">
          <Image
            src={logo_tiktok}
            priority
            alt="logo tiktok"
            className="w-[7rem] h-[3rem]"
          />
        </Link>
      </div>

      <div>
        <Search />
      </div>

      <div className="text-white flex items-center space-x-7">
        <Link href="http://localhost:3000/uploadfilm">
          <button className="flex items-center p-3 hover:border-2 hover:border-stone-800 border-2 border-stone-500 duration-200">
            <CiSquarePlus size={25} />
            UPLOAD
          </button>
        </Link>
        <GrSend size={25} />
        <TbInbox size={25} />
      </div>
    </div>
  );
};

export default Header;
