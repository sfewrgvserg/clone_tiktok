"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDebounce } from "use-debounce";

const Search = ({ searchParams }) => {
  const [text, setText] = useState("");
  const router = useRouter();
  const [query] = useDebounce(text, 500);
  useEffect(() => {
    if (text) {
      router.push(`/search?q=${query}`);
    } else {
      router.push(`/`);
    }
  }, [query, router]);

  return (
    <div className="group border-2 border-black duration-200 hover:border-2 hover:border-white hover:rounded-full">
      <div className="flex rounded-full items-center group-hover:bg-stone-300 text-white py-1 px-5 bg-stone-500">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Search"
          className="text-sm border-r-2 w-[25rem] bg-stone-500 group-hover:bg-stone-300 hover:text-black border-gray-800 rounded-l-full py-3 px-5 font-semibold outline-none"
        />
        <div className="px-3">
          <CiSearch color="black" size={25} />
        </div>
      </div>
    </div>
  );
};

export default Search;
