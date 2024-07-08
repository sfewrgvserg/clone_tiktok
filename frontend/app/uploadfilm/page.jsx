"use client";

import axios from "axios";
import { useState } from "react";

import { FaCloudUploadAlt } from "react-icons/fa";

import "./page.css";

require("dotenv").config();

const page = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);

  const main_id = process.env.NEXT_PUBLIC_MAIN_ID;

  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!file) {
      setMsg("Please select a file to upload.");
      return;
    }

    if (!caption.trim()) {
      setMsg("Please enter a caption for the file.");
      return;
    }

    const formData = new FormData();

    setMsg("uploading...");
    formData.append("film", file);
    formData.append("caption", caption);
    formData.append("created_by_user_id", main_id);

    try {
      setProgress((prevState) => {
        return { ...prevState, started: true };
      });
      const posted = await axios.post(
        "http://localhost:3001/all_posts",
        formData,
        {
          onDownloadProgress: (progressEvent) => {
            setProgress((prevState) => {
              return { ...prevState, pc: progressEvent.progress * 100 };
            });
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (posted) {
        setMsg("uploading successful!");
      }
    } catch (err) {
      setMsg("uploading failed!");
      console.error(err.message);
    }
  };

  return (
    <div>
      <div className="w-screen h-screen absolute">
        <form method="post">
          <input
            type="file"
            name="film"
            id="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label
            htmlFor="file"
            className="text-white cursor-pointer hover:border-stone-400 duration-200 font-semibold text-center flex justify-center items-center w-[75%] h-[75%] m-auto top-0 left-0 bottom-0 right-0 absolute border-2 border-dashed border-stone-700"
          >
            <div className="space-y-5 flex flex-col items-center">
              <FaCloudUploadAlt size={45} />
              <h2 className="text-2xl font-bold">Select Video to upload</h2>
              <p className="bg-rose-700 py-2 hover:bg-rose-500 px-16 rounded-md">
                Select Video
              </p>
              <input
                type="text"
                placeholder="Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="py-2 px-1 text-sm font-medium text-black"
              />
              <button
                className="text-white bg-rose-400 py-2 px-5 hover:bg-rose-500 rounded-md text-sm font-normal"
                onClick={handleUpload}
              >
                Upload Your Film
              </button>

              <div className="text-white flex flex-col">
                {progress.started && (
                  <progress
                    max="100"
                    className="w-[35rem] h-[2rem]"
                    value={progress.pc}
                  ></progress>
                )}

                {msg && (
                  <div className="flex flex-col">
                    <div>{msg}</div>
                    <div>{progress.pc}%</div>
                  </div>
                )}
              </div>
            </div>
          </label>
        </form>
      </div>
    </div>
  );
};

export default page;
