import React, { useState } from "react";
import { Box, Toolbar, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppButton from "./AppButton";
import { fetchUsers, filterUsers } from "../redux/actions";
import { useDispatch } from "react-redux";

const useStyle = makeStyles({
  toolbar: {
    float: "right",
  },
  button: {
    margin: "0 10px",
  },
});

function AppSearch() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  };

  const handleClick = () => {
    if (searchValue !== "") {
      dispatch(filterUsers(searchValue));
    } else dispatch(fetchUsers());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar className={classes.toolbar}>
        <TextField
          id="filled-basic"
          label="Filter Names"
          size="small"
          variant="filled"
          color="secondary"
          value={searchValue}
          onChange={handleChange}
        />
        <Box sx={{ flexGrow: 1 }} className={classes.button}>
          <AppButton onClick={handleClick} size="large">
            Filter Names
          </AppButton>
        </Box>
      </Toolbar>
    </Box>
  );
}

export default AppSearch;
