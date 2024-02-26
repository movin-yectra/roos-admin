import React from "react";
import { Outlet } from "react-router";

const Home: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Home;
