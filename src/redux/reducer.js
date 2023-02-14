import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import loginDetailsReducer from "./loginDetails/loginDetailsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  loginDetails: loginDetailsReducer,
});

export default rootReducer;
