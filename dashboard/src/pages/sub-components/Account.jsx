import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

const Account = () => {
  const [selecteComponent, setSelecteComponent] = useState("Profile");

  

  return (
    <>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link
              href="#"
              className={
                selecteComponent === "Profile"
                  ? "font-semibold text-primary"
                  : ""
              }
              onClick={() => setSelecteComponent("Profile")}
            >
              Profile
            </Link>
            <Link
              href="#"
              className={
                selecteComponent === "Update Profile"
                  ? "font-semibold text-primary"
                  : ""
              }
              onClick={() => setSelecteComponent("Update Profile")}
            >
              Update Profile
            </Link>
            <Link
              href="#"
              className={
                selecteComponent === "Update Password"
                  ? "font-semibold text-primary"
                  : ""
              }
              onClick={() => setSelecteComponent("Update Password")}
            >
              Update Password
            </Link>
          </nav>
          <div className="grid gap-6">
            {(() => {
              switch (selecteComponent) {
                case "Profile":
                  return <Profile />;
                case "Update Profile":
                  return <UpdateProfile />;
                case "Update Password":
                  return <UpdatePassword />;
              }
            })()}
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
