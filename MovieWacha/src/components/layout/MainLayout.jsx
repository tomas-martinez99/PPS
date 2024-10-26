import React from "react";
import PropTypes from "prop-types";
import Header from "../header/Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
