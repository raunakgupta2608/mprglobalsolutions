import { SET_LOGIN_DETAILS } from "./loginDetailsActionTypes";

export const setLoginDetails = (loginDetails) => {
  return {
    type: SET_LOGIN_DETAILS,
    payload: loginDetails,
  };
};
