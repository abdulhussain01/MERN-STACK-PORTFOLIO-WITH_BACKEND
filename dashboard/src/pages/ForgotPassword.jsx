import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllForgotPasswordErrors,
  forgotPassword,
} from "@/strore/slices/forgotResetPasswordSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigatedTo = useNavigate();

  const handlerForgotPassword = (email) => {
    dispatch(forgotPassword(email));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors);
    }
    if (isAuthenticated) {
      navigatedTo("/");
    }
    if (message !== null) {
      toast.success(message)
    }
  }, [isAuthenticated, dispatch, error, loading]);

  
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex min-h-screen items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to request for reset password.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                
                <Link
                  to={"/login"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Remember your password?
                </Link>
              </div>
              
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Requesting"} />
            ) : (
              <Button type="submit" className="w-full" onClick={()=>handlerForgotPassword(email)}>
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

export default ForgotPassword;
