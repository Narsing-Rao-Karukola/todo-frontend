import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import { Home } from "./components/Home";
import { TodoList } from "./components/TodoList";
import SignUp from "./components/SSO/SignUp";
import { Provider } from "react-redux";
import { store } from "./lib/redux/store";
import Login from "./components/SSO/Login";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="todo-list" element={<TodoList />} />
            <Route path="sso">
              <Route index={true} element={<Login />}></Route>
              <Route path="sign-up" element={<SignUp />} />
            </Route>
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
