import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewProject = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axios.get(
          `https://mern-stack-portfolio-backend-5gee.onrender.com/api/v1/project/get/${id}`
        );
 
        setTitle(data.project.title);
        setDescription(data.project.description);
        setProjectBanner(
          data.project.projectBanner && data.project.projectBanner.url
        );
        setProjectLink(data.project.projectLink);
        setGitRepoLink(data.project.gitRepoLink);
        setTechnologies(data.project.technologies);
        setStack(data.project.stack);
        setDeployed(data.project.deployed);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getProject();
  }, [id]);

  
  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
      <div className="w-[100%] px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-end">
              <Button onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <img
                  src={projectBanner ? projectBanner : "/avatarHolder.jpg"}
                  alt="projectBanner"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Description:</p>
                <ul className="list-disc">
                  {descriptionList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Technologies:</p>
                <ul className="list-disc">
                  {technologiesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Stack:</p>
                <p>{stack}</p>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Deployed:</p>
                <p>{deployed}</p>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Github Repository Link:</p>
                <Link className="text-sky-700" target="_blank" to={gitRepoLink}>
                  {gitRepoLink}
                </Link>
              </div>
              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Project Link:</p>
                <Link className="text-sky-700" target="_blank" to={projectLink}>
                  {projectLink}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
