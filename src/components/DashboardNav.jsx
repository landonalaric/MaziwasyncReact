import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const DashboardNav = ({ onMenuClick }) => {
    const { user, Logout } = useContext(AuthContext);

    return (
        <nav className="w-full bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-3">
            <div className="flex items-center justify-between">

                {/* Left Side */}
                <div className="flex items-center gap-4">

                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="md:hidden text-2xl text-gray-700 hover:text-green-600 transition"
                    >
                        <i className="bi bi-list"></i>
                    </button>

                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                            M
                        </div>

                        <span className="text-xl font-bold text-green-600">
                            MaziwaSync
                        </span>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {/* User Card */}
                    <div className="hidden sm:flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">

                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>

                        {/* User Details */}
                        <div className="leading-tight">
                            <p className="text-sm font-semibold text-gray-800">
                                {user?.username}
                            </p>

                            <p className="text-xs text-green-600 capitalize">
                                {user?.role}
                            </p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={Logout}
                        className="px-4 py-2 rounded-lg border border-red-500 text-red-600 font-medium hover:bg-red-500 hover:text-white transition duration-200"
                    >
                        <i className="bi bi-box-arrow-right mr-2"></i>
                        Logout
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default DashboardNav;
