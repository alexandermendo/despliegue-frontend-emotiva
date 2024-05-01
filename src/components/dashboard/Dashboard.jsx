import { Outlet } from "react-router-dom";
import { SidebarDash } from "./sidebar/Sidebar";
import { Navbar } from "./navbar/Navbar";
import './dashboard.css';

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <SidebarDash/>
      <div className="content">
        <Navbar/>
        <Outlet />
      </div>
    </div>
  );
};

