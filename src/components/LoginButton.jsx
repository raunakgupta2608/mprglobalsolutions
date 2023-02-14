import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AppButton from "./commonControls/AppButton";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <AppButton onClick={() => loginWithRedirect()}>Log In</AppButton>;
};

export default LoginButton;
