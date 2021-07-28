import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { loadState } from "../localStorage";
import rootReducer from "./rootReducer";

export function configureStore() {
  const persistedState = loadState();
  return createStore(rootReducer, persistedState, devToolsEnhancer());
}
