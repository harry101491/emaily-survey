import { combineReducers } from "redux";
// importing the formReducer from the redux-form
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer
});