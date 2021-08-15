import { combineReducers } from "redux"; // 여러 리듀서들을 하나로 합쳐준다.
import route from "./route";
import userList from "./userList";
import localUserList from "./localUserList";

const rootReducer = combineReducers({
  route,
  userList,
  localUserList,
});

export default rootReducer;
