import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
 import { ToastContainer } from "react-toastify";
 

const store = configureStore({
  reducer:rootReducer,
})
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHovers
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

