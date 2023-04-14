import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Root;
