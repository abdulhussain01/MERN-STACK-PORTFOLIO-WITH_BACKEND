import { useEffect, useRef, useState } from "react";
import { FaMoon, FaRegAddressBook, FaRegUser, FaSun } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { LuMenu } from "react-icons/lu";
import { SlGrid } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeTheme } from "../store/slices/theme.slice";

const MobileNav = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const { theme } = useSelector((state) => state.theme);

  const contentBoxRef = useRef(null);

  const dispatch = useDispatch();

  const handleThemeChange = () => {
    if (theme === "dark") {
      dispatch(changeTheme("light"));
      localStorage.setItem("theme", "light");
    } else {
      dispatch(changeTheme("dark"));
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contentBoxRef.current &&
        !contentBoxRef.current.contains(event.target)
      ) {
        setIsMenuActive(false); // Close modal
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuActive]);

  return (
    <div className=" xl:hidden " ref={contentBoxRef}>
      <button
        className="bg-lightwhite w-10 h-10 rounded-full flex items-center justify-center p-2"
        onClick={() => setIsMenuActive(!isMenuActive)}
      >
        <LuMenu className="text-commonblack w-8 h-8" />
      </button>

      {isMenuActive && (
        <div className="absolute mt-2 bg-lightwhite rounded-2xl flex flex-col gap-1">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "bg-themeprimary  flex flex-col justify-center items-center w-20 h-20 p-1 rounded-lg text-commonwhitetwo "
                : "bg-lightwhite flex flex-col justify-center items-center  text-commonblack w-20 h-20 p-1 rounded-lg hover:text-commonwhitetwo hover:bg-themeprimary "
            }
            onClick={() => setIsMenuActive(!isMenuActive)}
          >
            <FaRegUser className="w-10 h-10 px-2" />
            <p className="text-sm">About</p>
          </NavLink>
          <div className="mx-auto w-16 bg-bodytext h-[1px]" />
          <NavLink
            to={"/resume"}
            className={({ isActive }) =>
              isActive
                ? "bg-themeprimary  flex flex-col justify-center items-center w-20 h-20 p-1 rounded-lg text-commonwhitetwo "
                : "bg-lightwhite flex flex-col justify-center items-center  text-commonblack w-20 h-20 p-1 rounded-lg hover:text-commonwhitetwo hover:bg-themeprimary "
            }
            onClick={() => setIsMenuActive(!isMenuActive)}
          >
            <FiFileText className="w-10 h-10 px-2" />
            <p className="text-sm">Resume</p>
          </NavLink>
          <div className="mx-auto w-16 bg-bodytext h-[1px]" />
          <NavLink
            to={"/projects"}
            className={({ isActive }) =>
              isActive
                ? "bg-themeprimary  flex flex-col justify-center items-center w-20 h-20 p-1 rounded-lg text-commonwhitetwo "
                : "bg-lightwhite flex flex-col justify-center items-center  text-commonblack w-20 h-20 p-1 rounded-lg hover:text-commonwhitetwo hover:bg-themeprimary "
            }
            onClick={() => setIsMenuActive(!isMenuActive)}
          >
            <SlGrid className="w-10 h-10 px-2" />
            <p className="text-sm">Projects</p>
          </NavLink>
          <div className="mx-auto w-16 bg-bodytext h-[1px]" />
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive
                ? "bg-themeprimary  flex flex-col justify-center items-center w-20 h-20 p-1 rounded-lg text-commonwhitetwo "
                : "bg-lightwhite flex flex-col justify-center items-center  text-commonblack w-20 h-20 p-1 rounded-lg hover:text-commonwhitetwo hover:bg-themeprimary "
            }
            onClick={() => setIsMenuActive(!isMenuActive)}
          >
            <FaRegAddressBook className="w-10 h-10 px-2" />
            <p className="text-sm">Contact</p>
          </NavLink>
          <div
            onClick={handleThemeChange}
            className={
              "bg-lightwhite flex flex-col justify-center items-center  text-commonblack w-20 h-20 p-1 rounded-lg hover:text-commonwhitetwo hover:bg-themeprimary"
            }
          >
            {theme === "dark" ? (
              <FaSun className="w-10 h-10 px-2" />
            ) : (
              <FaMoon className="w-10 h-10 px-2" />
            )}
            <p className="text-sm">{theme === "dark" ? "Light" : "Dark"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
