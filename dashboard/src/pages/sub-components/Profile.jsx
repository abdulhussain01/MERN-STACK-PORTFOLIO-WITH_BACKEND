
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  // const dispatch = useDispatch();

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   toast.success("Logged Out!");
  // };

  // const navigateTo = useNavigate();

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearAllUserErrors());
  //   }
  //   if (!isAuthenticated) {
  //     navigateTo("/login");
  //   }
  // }, [isAuthenticated]);


  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-[100%] gap-6">
          <div className="grid  gap-2">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="mb-5">Full Profile Preview</p>
          </div>
          <div className="grid gap-6">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Profile Image</Label>
                <img
                  src={user && user.avatar && user.avatar.url}
                  alt="avatar"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
              </div>
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Resume</Label>
                <img
                  src={user && user.resume && user.resume.url}
                  alt="resume"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input type="text" defaultValue={user.fullName} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="text" defaultValue={user.email} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Phone Number</Label>
              <Input type="text" defaultValue={user.phone} disabled />
            </div>
            <div className="grid gap-2">
              <Label>About</Label>
              <Textarea defaultValue={user.about} disabled />
            </div>
            
            <div className="grid gap-2">
              <Label>GitHub URL</Label>
              <Input defaultValue={user.githubUrl} placeholder="https://example.com" disabled />
            </div>
            <div className="grid gap-2">
              <Label>LinkedIn URL</Label>
              <Input defaultValue={user.linkedInUrl} placeholder="https://example.com"  disabled />
            </div>
            <div className="grid gap-2">
              <Label>Twitter URL</Label>
              <Input defaultValue={user.twitterUrl} placeholder="https://example.com"  disabled />
            </div>
            <div className="grid gap-2">
              <Label>Facebook URL</Label>
              <Input defaultValue={user.facebookUrl}  placeholder="https://example.com" disabled />
            </div>
            <div className="grid gap-2">
              <Label>Instagram URL</Label>
              <Input defaultValue={user.instagramUrl} placeholder="https://example.com"  disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
