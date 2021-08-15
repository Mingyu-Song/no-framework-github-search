import { store } from "../store";

const initialState = {
  href: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === "CHANGE_ROUTE") {
    return { ...state, href: action.payload };
  }
  return { ...state };
};

export default reducer;

//dispatch
export const changeRoute = (payload) => {
  store.dispatch({ type: "CHANGE_ROUTE", payload });
};
