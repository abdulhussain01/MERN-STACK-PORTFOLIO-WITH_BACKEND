import { Outlet } from "react-router-dom";
import { AboutInfo } from "../components/AboutInfo";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      {/* <div className="flex  flex-col min-h-screen imgbackground">
       
        <div className="flex flex-col flex-1  my-5 lg:my-0">
          <div className="lg:flex flex-col xl:flex-row lg:justify-center lg:items-center  flex-1 gap-6 mx-5 md:mx-32 lg:mx-5 ">
            <div className="flex flex-1 lg:justify-center lg:items-center flex-col lg:flex-row gap-6  h-full">
              <AboutInfo />
              <div className="xl:flex flex-1 h-full w-full">
                <Outlet />
              </div>
            </div>
            <Navbar />
          </div>
        </div>
      </div> */}

      <div className="imgbackground">
        <div className="grid max-w- lg:grid-cols-[23rem,1fr] xl:grid-cols-[23rem,1fr,auto] items-center gap-4 min-h-screen p-8 md:mx-32 lg:mx-0">
          <AboutInfo />
          <Outlet />
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Home;
