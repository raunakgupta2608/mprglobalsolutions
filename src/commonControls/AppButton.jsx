import React from "react";
import { Button } from "@mui/material";

const AppButton = (props) => {
  const { onClick, ...rest } = props;
  return (
    <Button {...rest} color="info" variant="contained" onClick={onClick}>
      {props.children}
    </Button>
  );
};

export default AppButton;
