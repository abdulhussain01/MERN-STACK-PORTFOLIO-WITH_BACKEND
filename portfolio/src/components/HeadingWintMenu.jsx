import Navbar from "./Navbar";

const HeadingWintMenu = ({ heading }) => {
  return (
    <div className="flex items-center gap-5 mb-5">
      <h1 className="text-5xl font-semibold">{heading}</h1>
      <hr className="border-themeprimary w-48 border-t-[3px] rounded-md" />
      
    </div>
  );
};

export default HeadingWintMenu;
