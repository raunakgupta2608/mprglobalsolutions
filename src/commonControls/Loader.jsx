import React from "react";
import PropTypes from "prop-types";
import { Backdrop, CircularProgress } from "@mui/material";

const Loader = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

Loader.propTypes = {
  open: PropTypes.bool,
};

export default Loader;