import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SpecialLoadingButton from "./SpecialLoadingButton";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/strore/slices/userSlice";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, loading, isUpdated, message, error } = useSelector(
    (state) => state.user,
  );

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.about);
  const [githubUrl, setGithubUrl] = useState(
    user && user.githubUrl === undefined ? "" : user.githubUrl,
  );
  const [linkedInUrl, setLinkedInUrl] = useState(
    user && user.linkedInUrl === undefined ? "" : user.linkedInUrl,
  );
  const [instagramUrl, setInstagramUrl] = useState(
    user && user.instagramUrl === undefined ? "" : user.instagramUrl,
  );
  const [facebookUrl, setFaceBookUrl] = useState(
    user && user.facebookUrl === undefined ? "" : user.facebookUrl,
  );
  const [twitterUrl, setTwitterUrl] = useState(
    user && user.twitterUrl === undefined ? "" : user.twitterUrl,
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url,
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url,
  );

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file only.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("about", aboutMe);
    formData.append("linkedInUrl", linkedInUrl);
    formData.append("githubUrl", githubUrl);
    formData.append("facebookUrl", facebookUrl);
    formData.append("instagramUrl", instagramUrl);
    formData.append("twitterUrl", twitterUrl);
    formData.append("avatar", avatar);
    formData.append("resume", resume);

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid  gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
              <p className="mb-5">Update Your Profile</p>
            </div>
            <div className="grid gap-6">
              <div className="flex items-start sm:justify-around lg:items-center flex-col sm:flex-row">
                <div className="grid gap-2 w-full sm:w-64 ">
                  <Label>Profile Image</Label>
                  <img
                    src={avatarPreview && avatarPreview}
                    alt="avatar"
                    className="w-full h-auto sm:w-64 sm:h-72 rounded-2xl"
                  />
                  <div className="relative ">
                    <input
                      type="file"
                      className="avatar-update-btn w-full"
                      onChange={(e) => avatarHandler(e)}
                    />
                  </div>
                </div>
                <div className="grid gap-2  sm:w-64 ">
                  <Label>Resume</Label>
                  {resumePreview ? (
                    resumePreview.startsWith("data:application/pdf") ||
                    resumePreview.endsWith(".pdf") ? (
                      // ✅ Render PDF in an iframe instead of a broken <img>
                      <iframe
                        src={resumePreview}
                        title="Resume Preview"
                        className="w-[calc(100vw-2rem)] h-screen sm:w-64 sm:h-72 rounded-2xl border"
                      />
                    ) : (
                      <Link to={resumePreview} target="_blank">
                        <img
                          src={resumePreview}
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
                  <div className="relative">
                    {/* ✅ Restrict to PDF only */}
                    <input
                      type="file"
                      accept="application/pdf"
                      className="avatar-update-btn w-full"
                      onChange={resumeHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  value={fullName}
                  placeholder={"Your FullName"}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="text"
                  value={email}
                  placeholder={"Your Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Phone Number</Label>
                <Input
                  type="text"
                  value={phone}
                  placeholder={"Your Phone Number"}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>About</Label>
                <Textarea
                  value={aboutMe}
                  placeholder="About Me"
                  onChange={(e) => setAboutMe(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>GitHub URL</Label>
                <Input
                  value={githubUrl}
                  placeholder={user.githubUrl || "https://github.com"}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input
                  value={linkedInUrl}
                  placeholder={user.linkedInUrl || "https://linkedin.com"}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Twitter URL</Label>
                <Input
                  value={twitterUrl}
                  placeholder={"https://twitter.com"}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Facebook URL</Label>
                <Input
                  value={facebookUrl}
                  placeholder={user.facebookUrl || "https://facebook.com"}
                  onChange={(e) => setFaceBookUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Instagram URL</Label>
                <Input
                  value={instagramUrl}
                  placeholder={user.instagramUrl || "https://instagram.com"}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                {!loading ? (
                  <Button className="w-full" onClick={handleUpdateProfile}>
                    Update Profile
                  </Button>
                ) : (
                  <SpecialLoadingButton content={"Updating..."} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
