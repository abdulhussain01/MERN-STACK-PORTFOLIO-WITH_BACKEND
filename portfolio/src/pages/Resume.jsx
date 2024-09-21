import { useSelector } from "react-redux";
import Container from "../components/Container";
import HeadingWithMenu from "../components/HeadingWintMenu";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa6";

const Resume = () => {
  const { timeline } = useSelector((state) => state.timeline);
  const { skill } = useSelector((state) => state.skill);
  const { softwareApplication } = useSelector(
    (state) => state.softwareApplication
  );

  const education = timeline?.filter((edu) => edu.type === "Education")?.reverse();
  const work = timeline?.filter((edu) => edu.type === "Work")?.reverse();


  
  return (
    <Container>
      <HeadingWithMenu heading={"Resume"} />
      
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 ">
        <div className="">
          <div className="flex items-center gap-2">
            <FaGraduationCap className="w-8 h-8 text-themeprimary" />
            <h2 className="text-3xl">Education</h2>
          </div>
          {education?.map((item) => (
            <div
              className="my-6 p-5 rounded-2xl border border-bodytext "
              key={item._id}
            >
              <div className="flex flex-col gap-1  ">
                <p className="text-bodytext text-sm">
                  {item.timeline.from} - {item.timeline.to}
                </p>
                <h2 className="text-2xl capitalize">{item.title}</h2>
                <p className="text-bodytext capitalize">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <div className="flex items-center gap-2">
            <FaBriefcase className="w-8 h-8 text-themeprimary" />
            <h2 className="text-3xl">Work</h2>
          </div>
          {work?.map((item) => (
            <div
              className="my-6 p-5 rounded-2xl border border-bodytext"
              key={item._id}
            >
              <div className="flex flex-col gap-1  ">
                <p className="text-bodytext text-sm">
                  {item.timeline.from} - {item.timeline.to ? item.timeline.to : "Present"}
                </p>
                <h2 className="text-2xl capitalize">{item.title}</h2>
                {item.description?.split(/\n/g)?.map((line)=>
                  <p className="text-bodytext " key={line}>
                  {line}
                </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl">Skills</h2>

          <div className="flex flex-col gap-4">
            {skill?.map((item) => (
              <div className="" key={item._id}>
                <div className="flex gap-4 ">
                  <img
                    src={item.svg && item.svg.url}
                    alt=""
                    className="w-14 h-14 bg-commonwhitetwo p-1 rounded-full "
                  />
                  <div className="flex flex-col justify-center flex-1 ">
                    <h3 className="">{item.title}</h3>
                    <div className=" flex items-center gap-4">
                      <progress
                        value={item.proficiency}
                        max={100}
                        className="h-2  w-full "
                      />
                      <p className="">{item.proficiency}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex flex-col gap-4">
          <h2 className="text-2xl">Applications</h2>

          <div className=" grid grid-cols-2 gap-4 ">
            {softwareApplication?.map((item) => (
              <div className="border border-bodytext flex justify-center items-center p-2 rounded-2xl" key={item._id}>
                <div className="flex gap-2 flex-col ">
                  <img
                    src={item.svg && item.svg.url}
                    alt=""
                    className="w-14 h-auto"
                  />

                  <h3 className="">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Resume;
