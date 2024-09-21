import { useSelector } from "react-redux";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaDownload,
} from "react-icons/fa";

import { SlScreenSmartphone, SlEnvolopeLetter } from "react-icons/sl";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

export const AboutInfo = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <aside className="text-commonwhite bg-commonwhite px-4 py-4 xl:px-4 xl:py-8 rounded-3xl  lg:min-w-[23rem]  ">
      <div className="">
        <MobileNav />

        <div className="flex flex-col gap-6 ">
          <div className=" h-52 ">
            <img
              src={user?.avatar && user?.avatar?.url}
              alt=""
              className="w-52 h-52 object-center mx-auto rounded-2xl "
            />
          </div>
          <div className=" ">
            <h1 className="text-commonblack text-center text-2xl font-semibold mb-2">
              {user?.fullName}
            </h1>
            <div className="text-bodytext mb-4">
              <p className="bg-lightwhite w-fit mx-auto px-4 py-1 rounded-md">
                Developer
              </p>
            </div>

            <div className="w-fit mx-auto flex gap-3 ">
              <Link to={user?.facebookUrl} target="_blank">
                <FaFacebookF className="w-10 h-10 text-[#1b74e4] bg-lightwhite shadow-md p-2 rounded-md hover:bg-themeprimary hover:text-commonwhitetwo" />
              </Link>
              <Link to={user?.twitterUrl} target="_blank">
                <FaTwitter className="w-10 h-10 text-[#1C9CEA] bg-lightwhite shadow-md p-2 rounded-md hover:bg-themeprimary hover:text-commonwhitetwo" />
              </Link>
              <Link to={user?.instagramUrl} target="_blank">
                <FaInstagram className="w-10 h-10 text-[#e12a72] bg-lightwhite shadow-md p-2 rounded-md hover:bg-themeprimary hover:text-commonwhitetwo" />
              </Link>
              <Link to={user?.githubUrl} target="_blank">
                <FaGithub className="w-10 h-10 text-[#44566c] bg-lightwhite shadow-md p-2 rounded-md hover:bg-themeprimary hover:text-commonwhitetwo" />
              </Link>
            </div>
          </div>
          <div className="text-commonblack bg-lightwhite px-10 py-6 rounded-2xl text-sm">
            {/* phone */}

            <div className="flex items-center gap-3 border-b border-[#333] py-2">
              <div className="w-11 h-11  ">
                <SlScreenSmartphone
                  className="w-11 h-11 bg-commonwhite shadow-md p-2 rounded-md "
                  color="#E93B81"
                />
              </div>
              <div className="">
                <span className="text-sm text-bodytext capitalize">phone</span>
                <p>+91 {user?.phone}</p>
              </div>
            </div>

            {/*  Email   */}
            <div className="flex items-center gap-3 border-b border-[#333] py-2">
              <div className="w-11 h-11 ">
                <SlEnvolopeLetter
                  className="w-11 h-11 bg-commonwhite shadow-md p-2 rounded-md"
                  color="#6AB5B9"
                />
              </div>
              <div className="">
                <span className="text-sm text-bodytext capitalize">email</span>
                <p className="break-all">{user?.email}</p>
              </div>
            </div>

            {/*  linked In   */}
            <div className="flex items-center gap-3 border-b border-[#333] py-2">
              <div className="">
                <FaLinkedinIn
                  className="w-11 h-11 bg-commonwhite shadow-md p-2 rounded-md"
                  color="#144679"
                />
              </div>
              <div className="">
                <span className="text-sm text-bodytext capitalize">
                  Linked In
                </span>
                <p className="break-all lg:max-w-64">{user?.linkedInUrl}</p>
              </div>
            </div>
          </div>
          <div className=" flex-1 ">
            <a
              href={`${user?.resume && user?.resume.url}`}
              download
              target="_blank"
              
            >
              <button className="bg-themeprimary text-xl font-semibold text-commonwhitetwo px-4 py-3 rounded-lg flex items-center gap-3 hover:text-commonblack hover:bg-commonwhite border border-themeprimary mx-auto">
                <FaDownload className=" " /> Download Cv
              </button>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
