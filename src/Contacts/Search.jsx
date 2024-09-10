import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const Search = ({ onSearch }) => {
  const [searchIconColor, setSearchIconColor] = useState("text-gray-500");
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearchBarTextColor = (eventType) => {
    setSearchIconColor(
      eventType === "focus" ? "text-blue-500" : "text-gray-500",
    );
  };

  // Handle search query, typingTimeout is used to debounce the search query.
  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        onSearch(newQuery);
      }, 1000),
    );
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
        onFocus={() => handleSearchBarTextColor("focus")}
        onBlur={() => handleSearchBarTextColor("blur")}
        onChange={handleChange}
        value={query}
      />
    </div>
  );
};

export default Search;
