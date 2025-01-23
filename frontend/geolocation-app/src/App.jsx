import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import AllRoutesPage from "./pages/AllRoutesPage";
import Stats from "./pages/Stats";

const routes = (
  <Router>
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/allroutespage" exact element={<AllRoutesPage />} />
      <Route path="/stats" exact element={<Stats />} />
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
