import React, { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { SiHtmx } from "react-icons/si";
import { BsStack } from "react-icons/bs";

const ViewProject = ({ item, isSingleProject, setIsSingleProject }) => {
  const contentBoxRef = useRef(null);

  // Close the modal when clicking outside the contentbox
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contentBoxRef.current &&
        !contentBoxRef.current.contains(event.target)
      ) {
        setIsSingleProject(false); // Close modal
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSingleProject]);

  return (
    <div className="fixed inset-0 bg-[#00000073] z-10 flex justify-center items-center text-commonblack">
      <div className="w-full max-w-screen-md  relative flex flex-col justify-start items-center lg:mx-10">
        <div
          className="absolute -right-2 top-7 border rounded-full p-1 hover:rotate-90 transition-all hover:text-red-500 hover:border-red-500 z-10"
          onClick={() => setIsSingleProject(!isSingleProject)}
        >
          <IoCloseSharp className="w-5 h-5" />
        </div>

        <div
          ref={contentBoxRef}
          className="flex flex-col p-4 md:px-10  bg-commonwhitetwo dark:bg-[#323232] gap-8 relative rounded-2xl w-full  max-h-[90vh] overflow-y-auto my-10"
        >
          <div className="w-full">
            <h1 className="text-themesecondary capitalize font-bold text-2xl text-center">
              {item.title}
            </h1>
          </div>

          <div className="w-full">
            <img
              src={item.projectBanner && item.projectBanner.url}
              alt={item.title}
              className="aspect-video rounded-2xl w-full"
            />
          </div>

          <div className="w-full grid lg:grid-cols-2 grid-rows-2 flex-col  lg:flex-row flex-wrap ">
            <div className=" my-1 text-lg font-semibold">
              <div className="flex items-center gap-1">
                <Link
                  to={item.projectLink}
                  target="_blank"
                  className="hover:text-themeprimary break-all"
                >
                  <div className="flex items-center gap-1">
                    <FiFileText />
                    <span>Project Link </span>
                  </div>
                </Link>
              </div>
            </div>
            <div className=" my-1 text-lg font-semibold">
              <div className="flex items-start gap-1">
                <Link
                  to={item.gitRepoLink}
                  target="_blank"
                  className="hover:text-themeprimary break-all"
                >
                  <div className="flex items-center gap-1">
                    <FaGithub />
                    <span className="">GitHub </span>
                  </div>
                  
                </Link>
              </div>
            </div>
            <div className=" my-1 text-lg font-semibold">
              <div className="flex items-start gap-1">
                <div className="flex items-center gap-1">
                  <SiHtmx className="w-6 h-6" />
                  <span className="hidden md:block">Languages: </span>
                </div>
                <div className="capitalize text-wrap">
                  {item.technologies?.replaceAll(" ", ", ")}
                </div>
              </div>
            </div>
            <div className="my-1 text-lg font-semibold">
              <div className="flex items-start gap-1">
                <div className="flex items-center gap-1">
                  <BsStack className="w-6 h-6" />
                  <span className="hidden md:block">Tech Stack: </span>
                </div>
                <div className="break-all capitalize">{item.stack}</div>
              </div>
            </div>
          </div>

          <div className="w-full mb-10">
            <p className="text-bodytext">{item?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
