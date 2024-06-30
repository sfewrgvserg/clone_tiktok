import Image from "next/image";
import Link from "next/link";

import logo_tiktok from "@/public/image/user_logo/Tiktok-Logo-Black-and-White.png";

import Search from "./Search";

import { GrSend } from "react-icons/gr";
import { TbInbox } from "react-icons/tb";
import { CiSquarePlus } from "react-icons/ci";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-5 px-3">
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
        <button className="flex items-center p-3 bg-slate-700">
          <CiSquarePlus size={25} />
          UPLOAD
        </button>
        <GrSend size={25} />
        <TbInbox size={25} />
      </div>
    </div>
  );
};

export default Header;
