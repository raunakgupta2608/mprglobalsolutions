import {
  SET_USER_SELECTED_LOADING,
  SET_USER_SELECTED_SUCCESS,
  SET_USER_SELECTED_FAILURE,
} from "./selectedUserActionTypes";

const initialState = {
  loading: false,
  user: [],
  error: "",
};

const selectedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_SELECTED_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_USER_SELECTED_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case SET_USER_SELECTED_FAILURE:
      return {
        ...state,
        loading: false,
        user: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default selectedUserReducer;
