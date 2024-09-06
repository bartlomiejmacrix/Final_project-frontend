import React from "react";
import Search from "./Search";
import Contact from "./Contact";

const ContactList = () => {
  return (
    <div className="flex h-[760px] w-1/3 flex-col border-r-2 border-r-gray-200 px-2">
      <Search />
      <div className="scrollbar-hide overflow-y-scroll">
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
      </div>
    </div>
  );
};

export default ContactList;
