import React, { useRef, useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { TbCircleLetterF } from "react-icons/tb";
import { TbCircleLetterB } from "react-icons/tb";
import { LuMusic4 } from "react-icons/lu";
import { HiMiniDocumentDuplicate } from "react-icons/hi2";
import music from "../../Assets/music.mp3";
import "../../index.css";

const Navbar = ({ isLookingForDuplicates, handleDuplicates }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleOpenB = () => {
    window.open("https://github.com/bartlomiejmacrix/Final_Project", "_blank");
  };

  const handleOpenF = () => {
    window.open(
      "https://github.com/bartlomiejmacrix/Final_project-frontend",
      "_blank",
    );
  };

  const handleMusicToggle = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex h-16 items-center justify-between rounded-t-2xl border-b-2 border-b-gray-200 bg-white px-4">
      <div className="flex w-28 items-center justify-between">
        <IoPersonCircleSharp size={35} className="text-blue-500" />
        <p className="cursor-default font-semibold">Contacts</p>
      </div>
      <div className="flex gap-6">
        <HiMiniDocumentDuplicate
          size={40}
          className={`cursor-pointer rounded-2xl p-1 text-blue-500 ${isLookingForDuplicates ? "bg-blue-500 text-white" : "hover:bg-blue-400 hover:text-white"} transition-all duration-300`}
          title={
            isLookingForDuplicates
              ? "Find Duplicates"
              : "Stop Finding Duplicates"
          }
          onClick={handleDuplicates}
        />
        <LuMusic4
          size={40}
          className={`cursor-pointer rounded-2xl p-1 pr-2 text-blue-500 ${isPlaying ? "bg-blue-500 text-white" : "hover:bg-blue-400 hover:text-white"} transition-all duration-300`}
          title={isPlaying ? "Pause Music" : "Play Music"}
          onClick={handleMusicToggle}
        />
        <TbCircleLetterB
          size={40}
          className="btn"
          onClick={handleOpenB}
          title="Backend Repository"
        />
        <TbCircleLetterF
          size={40}
          className="btn"
          onClick={handleOpenF}
          title="Frontend Repository"
        />
        <FiRefreshCcw
          size={40}
          className="btn"
          onClick={handleRefresh}
          title="Refresh Page"
        />
      </div>

      <audio ref={audioRef} src={music} />
    </div>
  );
};

export default Navbar;
