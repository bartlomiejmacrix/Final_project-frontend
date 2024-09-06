import { IoMdSearch } from "react-icons/io";

const Search = () => {
  return (
    <div className="flex items-center pb-4">
      <IoMdSearch size={25} className="absolute ml-3 mt-4 text-gray-500" />
      <input
        type="text"
        placeholder="Search..."
        className="mt-4 w-full rounded-full bg-gray-200 p-2 pl-12 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Search;
