import { SET_LOGIN_DETAILS } from "./loginDetailsActionTypes";

const initialState = {
  loading: false,
  loginDetails: {},
  error: "",
};

const loginDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DETAILS:
      return {
        ...state,
        loading: false,
        loginDetails: action.payload,
      };

    default:
      return state;
  }
};

export default loginDetailsReducer;
