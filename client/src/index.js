import React from "react";
import ReactDOM from "react-dom";
import "materialize-css/dist/css/materialize.min.css";
import "./index.css";

import App from "./components/App";

import { Provider } from "react-redux";

// creating a store with createStore and applying redux-thunk
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";

// creating the redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector("#root")
);