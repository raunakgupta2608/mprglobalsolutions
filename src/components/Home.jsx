import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useDispatch } from "react-redux";
import { setLoginDetails } from "../redux/actions";
import { makeStyles } from "@mui/styles";
import EnhancedTable from "../commonControls/SortingTable";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  appTable: {
    margin: "20px",
    height: "73vh",
  },
  welcomeText: {
    flexGrow: 2,
    textAlign: "center",
  },
  logoutButton: {
    flexGrow: 0.3,
  },
  imageP: {
    overflow: "hidden",
    height: "inherit",
    background: "red",
    maxHeight: "fit-content",
  },
  profilePic: {
    height: "inherit",
    width: "inherit",
    objectFit: "contain",
  },
  alignUserDetails: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } =
    useAuth0();

  useEffect(() => {
    if (user) {
      dispatch(setLoginDetails(user));
      fetchToken();
    }
  }, [user]);

  const fetchToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      sessionStorage.setItem("token", token);
      dispatch(setLoginDetails({ ...user, token }));
    } catch (error) {
      console.log("error", error);
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <>
      <div className="App-header">
        <p className={classes.imageP}>
          {user.picture && (
            <img
              className={classes.profilePic}
              src={user.picture}
              alt={user.name}
            />
          )}
        </p>
        <div className={classes.alignUserDetails}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
        <p>
          <LogoutButton />
        </p>
      </div>
      <div className={classes.appTable}>
        <EnhancedTable />
      </div>
    </>
  ) : (
    <>
      <div className="App-header">
        <p className={classes.welcomeText}>Welcome to MprGlobalSolutions</p>
        <p className={classes.logoutButton}>
          <LoginButton />
        </p>
      </div>
    </>
  );
};

export default Home;
