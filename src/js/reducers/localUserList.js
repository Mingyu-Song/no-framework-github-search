import { store } from "../store";

const initialState = {
  status: null,
  users: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === "ADD_LOCAL_SEARCH_LIST") {
    return { ...state, status: "stale", users: [...action.payload] };
  }
  if (action.type === "REMOVE_LOCAL_SEARCH_LIST") {
    const copiedLocalUserList = { ...state };
    const clickedUserLogin = action.payload;

    //users에 해당 index찾기
    const existUserIndex = copiedLocalUserList.users.findIndex((item) => {
      return item.record.find((user) => {
        return user.login === clickedUserLogin;
      });
    });

    //index로 접근해 record안에 같은 login값 가진 object 제거
    const removedRecords = copiedLocalUserList.users[
      existUserIndex
    ].record.filter((item) => {
      return item.login !== clickedUserLogin;
    });

    //locaUserList에 적용
    copiedLocalUserList.users[existUserIndex].record = removedRecords;

    //빈 record의 객체 제거
    const removedBlankRecords = copiedLocalUserList.users.filter((list) => {
      return list.record.length > 0;
    });

    const result = removedBlankRecords;
    return {
      ...state,
      status: result.length < 1 ? null : state.status,
      users: result,
    };
  }
  if (action.type === "NO_LOCAL_SEARCH_LIST") {
    return { ...state, status: "no_result" };
  }
  if (action.type === "LOCAL_TRIGGER_SEARCH") {
    return { ...state, status: "loading" };
  }
  return { ...state };
};

export default reducer;

//dispatch
export const localTriggerSearch = () => {
  store.dispatch({ type: "LOCAL_TRIGGER_SEARCH" });
};
export const addLocalSearchList = (payload) => {
  if (payload.length > 0) {
    store.dispatch({ type: "ADD_LOCAL_SEARCH_LIST", payload });
  } else {
    store.dispatch({ type: "NO_LOCAL_SEARCH_LIST" });
  }
};

export const removeLocalSearchList = (payload) => {
  if (payload) {
    store.dispatch({ type: "REMOVE_LOCAL_SEARCH_LIST", payload });
  }
};
