import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleWare = [thunk];
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
