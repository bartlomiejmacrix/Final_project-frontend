import React, { useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPenAlt } from "react-icons/fa";
import { RiDeleteBin4Fill } from "react-icons/ri";

const ThreeDots = ({
  showOptions,
  setShowOptions,
  setShowModal,
  handleUpdate,
}) => {
  const ref = useRef(null);

  // Hide options when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowOptions]);

  const dotsStyles = `absolute right-4 top-4 cursor-pointer rounded-lg p-2 text-blue-500 transition-all duration-200 hover:bg-blue-500 hover:text-white ${showOptions ? "text-white bg-blue-500" : ""}`;

  return (
    <div ref={ref} className={dotsStyles} onClick={() => setShowOptions(true)}>
      <BsThreeDotsVertical size={25} />
      {showOptions && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-300 bg-white p-2 shadow-md">
          <ul className="text-black">
            <li
              className="flex cursor-pointer items-center rounded-lg p-2 transition-all duration-200 hover:bg-blue-500 hover:text-white"
              onClick={handleUpdate}
            >
              <FaPenAlt />
              <p className="ml-2">Update contact</p>
            </li>
            <li
              className="flex cursor-pointer items-center rounded-lg p-2 text-red-500 transition-all duration-200 hover:bg-red-500 hover:text-white"
              onClick={() => setShowModal(true)}
            >
              <RiDeleteBin4Fill />
              <p className="ml-2">Delete contact</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThreeDots;
