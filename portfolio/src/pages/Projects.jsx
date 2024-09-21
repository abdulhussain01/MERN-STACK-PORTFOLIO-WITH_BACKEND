import Container from "../components/Container";
import { useSelector } from "react-redux";
import HeadingWintMenu from "../components/HeadingWintMenu";
import { useState } from "react";
import ViewProject from "./ViewProject";
const Projects = () => {
  const { projects, loading } = useSelector((state) => state.project);

  const [singleProject, setSingleProject] = useState({});

  const [isSingleProject, setIsSingleProject] = useState(false);

  const handleViewProject = (item) => {
    setIsSingleProject(!isSingleProject);
    setSingleProject(item);
  };

  
  return (
    <Container>
      <div className="flex-1">
        <div className="">
          <HeadingWintMenu heading={"Projects"} />
        </div>
        <div className="flex flex-wrap">
          {projects?.map((item) => (
            <div
              className="lg:w-2/4 text-commonblack"
              key={item._id}
              onClick={() => {
                handleViewProject(item);
              }}
            >
              <div className="p-4 m-4 border border-[#353535] rounded-2xl  bg-catkrill">
                <img
                  src={item?.projectBanner && item.projectBanner.url}
                  alt=""
                  className="aspect-video rounded-lg"
                />
                <div className="mt-3 flex flex-col gap-3">
                  <h1 className="text-2xl capitalize ">{item.title}</h1>
                  <p className="text-bodytext line-clamp-1">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isSingleProject && (<div className="" >

        <ViewProject item={singleProject} isSingleProject={isSingleProject} setIsSingleProject={setIsSingleProject}/>
      </div>
      )}

      
    </Container>
  );
};

export default Projects;
