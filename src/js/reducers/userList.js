import { store } from "../store";

const initialState = {
  status: null,
  users: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === "ADD_SEARCH_LIST") {
    return { ...state, status: "stale", users: [...action.payload] };
  }
  if (action.type === "NO_SEARCH_LIST") {
    return { ...state, status: "no_result" };
  }
  if (action.type === "TRIGGER_SEARCH") {
    return { ...state, status: "loading" };
  }
  return { ...state };
};

export default reducer;

//dispatch
export const triggerSearch = () => {
  store.dispatch({ type: "TRIGGER_SEARCH" });
};
export const addSearchList = (payload) => {
  if (payload.length > 0) {
    store.dispatch({ type: "ADD_SEARCH_LIST", payload });
  } else {
    store.dispatch({ type: "NO_SEARCH_LIST" });
  }
};
