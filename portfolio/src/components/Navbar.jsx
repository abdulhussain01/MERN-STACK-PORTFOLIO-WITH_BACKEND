import { FaRegUser, FaRegAddressBook, FaSun, FaMoon } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { SlGrid } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {changeTheme} from "../store/slices/theme.slice"
const Navbar = () => {
  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch()

  const handleThemeChange = ()=>{
    if(theme==="dark"){
      dispatch(changeTheme("light"))
      localStorage.setItem("theme","light")
    }
    else{
      dispatch(changeTheme("dark"))
      localStorage.setItem("theme","dark")
    }
  }

  return (
    <>
      <div className="bg-commonwhite p-4 hidden xl:flex flex-col gap-4 rounded-2xl xl:sticky xl:top-0   ">
        <NavLink 
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "bg-themeprimary  flex flex-col justify-center items-center w-20 h-20 p-1 rounded-lg text-commonwhitetwo "
              : "bg-lightwhite flex flex-col justify-center items-center  text-commonblack w-20 h-20 p-1 rounded-lg hover:text-commonwhitetwo hover:bg-themeprimary "
          }
        >
          <FaRegUser className="w-10 h-10 px-2 " />
          <p className="text-sm">About</p>
        </NavLink>
        <NavLink
          to={"/resume"}
          className={({ isActive }) =>
            isActive
              ? "bg-themeprimary  flex flex-col justify-center items-center w-20 h-20 p-1 rounded-lg text-commonwhitetwo "
              : "bg-lightwhite flex flex-col justify-center items-center  text-commonblack w-20 h-20 p-1 rounded-lg hover:text-commonwhitetwo hover:bg-themeprimary "
          }
        >
          <FiFileText className="w-10 h-10 px-2" />
          <p className="text-sm">Resume</p>
        </NavLink>
        <NavLink
          to={"/projects"}
          className={({ isActive }) =>
            isActive
              ? "bg-themeprimary  flex flex-col justify-center items-center w-20 h-20 p-1 rounded-lg text-commonwhitetwo "
              : "bg-lightwhite flex flex-col justify-center items-center  text-commonblack w-20 h-20 p-1 rounded-lg hover:text-commonwhitetwo hover:bg-themeprimary "
          }
        >
          <SlGrid className="w-10 h-10 px-2" />
          <p className="text-sm">Projects</p>
        </NavLink>
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            isActive
              ? "bg-themeprimary  flex flex-col justify-center items-center w-20 h-20 p-1 rounded-lg text-commonwhitetwo "
              : "bg-lightwhite flex flex-col justify-center items-center  text-commonblack w-20 h-20 p-1 rounded-lg hover:text-commonwhitetwo hover:bg-themeprimary "
          }
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
          {theme === "dark"? (
            <FaSun className="w-10 h-10 px-2" />
          ) : (
            <FaMoon className="w-10 h-10 px-2" />
          )}
          <p className="text-sm">{theme==="dark" ? "Light":"Dark"}</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
