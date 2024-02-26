import React from "react";
import { Outlet } from "react-router";

const Restaurant: React.FC = () => {
  return (
    <div className="container-fliud h-100">
      <Outlet />
    </div>
  );
};

export default Restaurant;
