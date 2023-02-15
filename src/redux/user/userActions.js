import API from "../../utils/axios";

import {
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  FILTER_USERS,
} from "./userActionTypes";

const fetchUsersRequest = () => {
  return {
    type: GET_USER_LOADING,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: GET_USER_SUCCESS,
    payload: users,
  };
};
const fetchUsersFailure = (error) => {
  return {
    type: GET_USER_FAILURE,
    payload: error,
  };
};

const fetchfilteredUsers = (key) => {
  return {
    type: FILTER_USERS,
    payload: key,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    API.get("/users")
      .then((response) => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        const errMsg = error.message;
        dispatch(fetchUsersFailure(errMsg));
      });
  };
};

export const filterUsers = (key) => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    dispatch(fetchfilteredUsers(key));
  };
};
