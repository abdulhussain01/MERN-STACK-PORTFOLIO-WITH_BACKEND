import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "@/lib/worker";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-[100%] gap-6">
          <div className="grid  gap-2">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="mb-5">Full Profile Preview</p>
          </div>
          <div className="grid gap-6">
            <div className="flex items-start md:justify-around lg:items-center flex-col sm:flex-row ">
              <div className="grid gap-2 w-full sm:w-72 ">
                <Label>Profile Image</Label>
                <img
                  src={user && user.avatar && user.avatar.url}
                  alt="avatar"
                  className="w-full h-auto sm:w-64 sm:h-72 rounded-2xl"
                />
              </div>
              <div className="grid gap-2  sm:w-64">
                <Label>Resume</Label>
               

                {user && user.resume ? (
                  user.resume.url.endsWith(".pdf") ? (
                    // ✅ Render PDF in an iframe instead of a broken <img>
                    <iframe
                      src={user.resume.url}
                      title="Resume Preview"
                      className="w-[calc(100vw-2rem)] h-screen sm:w-64 sm:h-72 rounded-2xl border"
                    />
                  ) : (
                    <Link to={user.resume.url} target="_blank">
                      <img
                        src={user.resume.url}
                        alt="resume"
                        className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                      />
                    </Link>
                  )
                ) : (
                  <div className="w-full sm:w-72 sm:h-72 rounded-2xl border flex items-center justify-center text-gray-400">
                    No resume uploaded
                  </div>
                )}
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
              <Input
                defaultValue={user.githubUrl}
                placeholder="https://example.com"
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label>LinkedIn URL</Label>
              <Input
                defaultValue={user.linkedInUrl}
                placeholder="https://example.com"
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label>Twitter URL</Label>
              <Input
                defaultValue={user.twitterUrl}
                placeholder="https://example.com"
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label>Facebook URL</Label>
              <Input
                defaultValue={user.facebookUrl}
                placeholder="https://example.com"
                disabled
              />
            </div>
            <div className="grid gap-2">
              <Label>Instagram URL</Label>
              <Input
                defaultValue={user.instagramUrl}
                placeholder="https://example.com"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
