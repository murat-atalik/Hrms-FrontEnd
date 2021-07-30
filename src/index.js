import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { configureStore } from "./store/configureStore";
import { Provider } from "react-redux";
import { saveState } from "./localStorage";

const options = {
  timeout: 3000,
  position: positions.BOTTOM_RIGHT,
  containerStyle: {
    zIndex: 999999,
  },
};

const store = configureStore();
store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
