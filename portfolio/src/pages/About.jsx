import { useSelector } from "react-redux";
import HeadingWintMenu from "../components/HeadingWintMenu";
import Container from "../components/Container";

const About = () => {
  const { user } = useSelector((state) => state.user);

  const roles = [
    {
      id: 1,
      title: "web developer",
      description:
        "Creating responsive, efficient, and user-friendly websites using modern web technologies like HTML, CSS, JavaScript, and frameworks like React and Next.",
    },
    
    {
      id: 2,
      title: "Full Stack Dev",
      description:
        "Building scalable web applications, working with both client-side and server-side technologies to deliver complete solutions.",
    },
    
  ];

  return (
    <Container>
      <div className="flex-1 ">
        <div className="">
          <HeadingWintMenu heading={"About"} />

          
            {user?.about?.split(/\n/g).map((line)=>
              <p className="text-base text-bodytext  my-2 xl:max-w-screen-md" key={line}>
              {line}
            </p>
            )}
         
        </div>
        <div className="rounded-3xl  bg-commonwhite my-4 text-commonblack">
          <div className="">
            <div className="flex items-center gap-5 mb-5">
              <h1 className="text-2xl font-semibold">What I Do!</h1>
            </div>

            <div className="flex flex-wrap justify-between">
              {roles?.map((role) => (
                <div className="  lg:w-[47.5%] " key={role.id}>
                  <div
                    className={`border border-[#353535] p-8 my-4 flex flex-col gap-4 rounded-lg ${
                      role.id % 2 === 0 ? "bg-prink " : "bg-catkrill"
                    }`}
                  >
                    <h2 className="capitalize text-2xl">{role?.title}</h2>
                    <p className="text-bodytext ">{role?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>
    </Container>
  );
};

export default About;
