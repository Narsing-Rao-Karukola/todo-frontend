import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import { Home } from "./components/Home";
import { TodoList } from "./components/TodoList";
import Sso from "./components/SSO";
import SignUp from "./components/SSO/SignUp";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="todo-list/*" element={<TodoList />} />
          <Route path="sso">
            <Route index={true} element={<Sso />}></Route>
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
