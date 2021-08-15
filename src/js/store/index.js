import reducers from "../reducers";

const Redux = require("redux");

//store
export const store = Redux.createStore(reducers);

//selector
export const getStore = () => store.getState();
