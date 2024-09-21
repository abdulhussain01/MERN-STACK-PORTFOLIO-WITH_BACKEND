import React, { useEffect, useState } from "react";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAllForgotPasswordErrors, resetPassword } from "@/strore/slices/forgotResetPasswordSlice";
import { getUser } from "@/strore/slices/userSlice";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigatedTo = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors);
    }
    if (isAuthenticated) {
      navigatedTo("/");
    }
    if (message !== null) {
      toast.success(message);
      dispatch(getUser())
    }
  }, [isAuthenticated, dispatch, error, loading]);

  const handlerResetPassword = () => {
    dispatch(resetPassword(token,password,confirmPassword))
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex min-h-screen items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
              Set a new password.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {loading ? (
              <SpecialLoadingButton content={"Resetting password"} />
            ) : (
              <Button
                type="submit"
                className="w-full"
                onClick={() => handlerResetPassword()}
              >
                Request for Reset Password
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
