import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import loginDetailsReducer from "./loginDetails/loginDetailsReducer";
import selectedUserReducer from "./userSelected/selectedUserReducer";

const rootReducer = combineReducers({
  user: userReducer,
  loginDetails: loginDetailsReducer,
  selectedUser: selectedUserReducer,
});

export default rootReducer;
