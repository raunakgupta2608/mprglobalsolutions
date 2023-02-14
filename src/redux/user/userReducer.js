import {
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "./userActionTypes";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
