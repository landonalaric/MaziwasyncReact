import React, { useState } from "react";
import SideBar from "./SideBar";
import DashboardNav from "../DashboardNav";
import { Outlet } from "react-router-dom";

const FarmerLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full">
        <DashboardNav
          onMenuClick={() => setIsOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FarmerLayout;