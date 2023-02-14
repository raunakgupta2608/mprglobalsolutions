import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AppButton from "../commonControls/AppButton";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <AppButton
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </AppButton>
  );
};

export default LogoutButton;
