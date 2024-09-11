import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const Search = ({ onSearch, isInteractionDisabled }) => {
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
    <div
      className={`relative flex items-center pb-4 ${isInteractionDisabled && "cursor-not-allowed"}`}
    >
      <IoMdSearch
        size={25}
        className={`absolute ml-3 mt-4 ${searchIconColor} ${isInteractionDisabled && "cursor-not-allowed"}`}
        disabled={isInteractionDisabled}
      />
      <input
        type="text"
        placeholder="Search..."
        className={`mt-4 w-full rounded-full bg-gray-200 p-2 pl-12 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${isInteractionDisabled && "cursor-not-allowed"}`}
        onFocus={() => handleSearchBarTextColor("focus")}
        onBlur={() => handleSearchBarTextColor("blur")}
        onChange={handleChange}
        value={query}
        disabled={isInteractionDisabled}
      />
    </div>
  );
};

export default Search;
