import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Search from "./Search";

const Paths = () => (
  <Routes>
    <Route exact path="/" element={<App />} />
    <Route path="/search" element={<Search />} />
  </Routes>
);

ReactDOM.render(
  <Router>
    <Paths />
  </Router>,
  document.getElementById("root")
);