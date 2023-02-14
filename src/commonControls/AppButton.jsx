import React from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  button: {},
}));

const AppButton = (props) => {
  const classes = useStyles();
  const { onClick } = props;
  return (
    <Button
      className={classes.button}
      color="info"
      variant="contained"
      onClick={onClick}
    >
      {props.children}
    </Button>
  );
};

export default AppButton;
