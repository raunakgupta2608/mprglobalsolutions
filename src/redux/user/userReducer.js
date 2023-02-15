import {
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  FILTER_USERS,
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

    case FILTER_USERS:
      return {
        ...state,
        loading: false,
        users: (function () {
          if (state.users.length > 0) {
            const filteredUsers = state.users.filter((ele) => {
              return ele.name.toLowerCase().includes(action.payload);
            });
            console.log("filteredUsers", filteredUsers);
            return filteredUsers;
          } else return state.users;
        })(),
      };

    default:
      return state;
  }
};

export default userReducer;
