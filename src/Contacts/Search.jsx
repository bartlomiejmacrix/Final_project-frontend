import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const Search = () => {
  const [searchIconColor, setSearchIconColor] = useState("text-gray-500");

  const handleFocus = () => {
    setSearchIconColor("text-blue-500");
  };

  const handleBlur = () => {
    setSearchIconColor("text-gray-500");
  };

  return (
    <div className="relative flex items-center pb-4">
      <IoMdSearch
        size={25}
        className={`absolute ml-3 mt-4 ${searchIconColor}`}
      />
      <input
        type="text"
        placeholder="Search..."
        className="mt-4 w-full rounded-full bg-gray-200 p-2 pl-12 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default Search;
