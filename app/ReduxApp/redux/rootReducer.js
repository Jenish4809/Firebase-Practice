import { combineReducers } from "redux";
import { reducer } from "./reducer";
import theme from "./themeReducer";

export default combineReducers({
  reducer,
  theme,
});
