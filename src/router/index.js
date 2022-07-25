import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Interview from "./Interview";
import Navbar from "../components/Navigation";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      
      {/* {isLoggedIn && <Navigation />} */
      <Navbar />}
      <div className="ms-3 me-3 mt-1 mb-3">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/home" element={<Home />} />
            </>
          ) : (
            <>
              <Route path="/" exact element={<Auth />} />
              <Route path="/*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
