import API from "../../utils/axios";
import { fetchUsers } from "../actions";
import {
  SET_USER_SELECTED_LOADING,
  SET_USER_SELECTED_SUCCESS,
  SET_USER_SELECTED_FAILURE,
} from "./selectedUserActionTypes";

const setUserSelectedRequest = () => {
  return {
    type: SET_USER_SELECTED_LOADING,
  };
};

const setUserSelectedSuccess = (user) => {
  return {
    type: SET_USER_SELECTED_SUCCESS,
    payload: user,
  };
};
const setUserSelectedFailure = (error) => {
  return {
    type: SET_USER_SELECTED_FAILURE,
    payload: error,
  };
};

export const setSelectedUser = (user) => {
  return (dispatch) => {
    dispatch(setUserSelectedRequest());
    dispatch(setUserSelectedSuccess(user));
  };
};

export const updateSelectedUser = (selectedUser) => {
  return (dispatch) => {
    dispatch(setUserSelectedRequest());
    API.put(`/users/${selectedUser.id}`, selectedUser)
      .then((response) => {
        if (response.status === 200) dispatch(setUserSelectedSuccess([]));
        dispatch(fetchUsers());
      })
      .catch((error) => {
        const errMsg = error.message;
        dispatch(setUserSelectedFailure(errMsg));
      });
  };
};

export const deleteSelectedUser = (id) => {
  return (dispatch) => {
    dispatch(setUserSelectedRequest());
    API.delete(`/users/${id}`)
      .then((response) => {
        if (response.status === 200) dispatch(setUserSelectedSuccess([]));
        dispatch(fetchUsers());
      })
      .catch((error) => {
        const errMsg = error.message;
        dispatch(setUserSelectedFailure(errMsg));
      });
  };
};
