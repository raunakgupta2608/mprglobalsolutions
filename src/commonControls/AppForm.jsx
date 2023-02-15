import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import AppButton from "./AppButton";
import { deleteSelectedUser, updateSelectedUser } from "../redux/actions";
import Loader from "./Loader";

const useStyles = makeStyles({
  form: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0px 50px 0",
    width: "100%",
  },
  divContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexBasis: "max-content",

    "& .MuiFormControl-root": {
      margin: "0 10px",
    },
  },
});

function AppForm() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading: loadingSelectedUser, user: selectedUser } = useSelector(
    (state) => state.selectedUser
  );

  useEffect(() => {
    const { name, email, contact } = selectedUser;
    setName(name);
    setEmail(email);
    setContact(contact);
  }, [selectedUser]);

  useEffect(() => {
    setOpen(loadingSelectedUser);
  }, [loadingSelectedUser]);

  const handleEdit = () => {
    dispatch(
      updateSelectedUser({
        ...selectedUser,
        name,
        email,
        contact,
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteSelectedUser(selectedUser.id));
  };

  return (
    <>
      <Loader open={open} />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className={classes.form}
      >
        <Box component="div" className={classes.divContainer}>
          <TextField
            id="name"
            label="Name"
            size="small"
            variant="filled"
            color="secondary"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <TextField
            id="email"
            label="Email"
            size="small"
            variant="filled"
            color="secondary"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <TextField
            id="contact"
            label="Contact"
            size="small"
            variant="filled"
            color="secondary"
            value={contact}
            onChange={({ target }) => setContact(target.value)}
          />
        </Box>
        <Box component="div" className={classes.divContainer}>
          <AppButton onClick={handleEdit} style={{ margin: "0 10px" }}>
            Edit
          </AppButton>
          <AppButton onClick={handleDelete} style={{ margin: "0 10px" }}>
            Delete
          </AppButton>
        </Box>
      </Box>
    </>
  );
}

export default AppForm;
