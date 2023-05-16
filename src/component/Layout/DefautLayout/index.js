import React, { children } from "react";
import Header from "./Header";
import SideBar from "./Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">
        <SideBar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
