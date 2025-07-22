import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaScroll, FaUserPlus } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-xl h-screen fixed top-0 left-0 overflow-y-auto z-10">
      <div className="flex items-center p-6 border-b border-gray-100">
        <div className="h-8 w-8 bg-blue-200 rounded-lg mr-3 flex items-center justify-center text-blue-800 font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <span className="text-lg font-bold text-gray-900 tracking-wide">
          Personal Finance
        </span>
      </div>

      {/* Bagian Navigasi */}
      <nav className="py-4">
        <div className="mb-6">
          <h3 className="text-xs font-medium uppercase text-gray-500 px-6 mb-3 tracking-wider">
            Home
          </h3>
          <ul>
            <li className="mb-1">
              <a
                href="#"
                className="flex items-center py-2.5 px-6 mx-3 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="mr-4 text-gray-500">
                  {/* Placeholder ikon */}
                  <div className="bg-gray-300 rounded-xl w-7 h-7 place-items-center content-center"><MdDashboard /></div>
                </span>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="mb-1">
              <a
                href="#"
                className="flex items-center py-2.5 px-6 mx-3 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="mr-4 text-gray-500">
                  <div className="bg-gray-300  rounded-xl w-7 h-7 place-items-center content-center"><FaScroll /></div>
                </span>
                <span>Transaction</span>
              </a>
            </li>
            {/* Contoh item aktif */}
            <li className="mb-1">
              <a
                href="#"
                className="flex items-center py-2.5 px-6 mx-3 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out bg-blue-600 text-white shadow-md"
              >
                <span className="mr-4 text-white">
                  {/* Placeholder ikon */}
                  <div className="w-7 h-7 bg-blue-300 rounded-xl place-items-center content-center"></div>
                </span>
                <span>Menu Item Active</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Seksi Navigasi 2 */}
        <div className="mb-6">
          <h3 className="text-xs font-medium uppercase text-gray-500 px-6 mb-3 tracking-wider">
            Authentication
          </h3>
          <ul>
            <li className="mb-1">
              <a
                href="#"
                className="flex items-center py-2.5 px-6 mx-3 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="mr-4 text-gray-500">
                  {/* Placeholder ikon */}
                  <div className="w-7 h-7 bg-gray-300 rounded-xl place-items-center content-center"><CiLogin /></div>
                </span>
                <span>Login</span>
              </a>
            </li>
            <li className="mb-1">
              <a
                href="#"
                className="flex items-center py-2.5 px-6 mx-3 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="mr-4 text-gray-500">
                  {/* Placeholder ikon */}
                  <div className="w-7 h-7 bg-gray-300 rounded-xl place-items-center content-center"><FaUserPlus /></div>
                </span>
                <span>Register</span>
              </a>
            </li>
          </ul>
        </div>

      </nav>

      <div className="absolute bottom-0 w-full p-6 text-center text-xs text-gray-400 border-t border-gray-100">
        &copy; {new Date().getFullYear()} Create By Iqbal Pradipta.
      </div>
    </div>
  );
}

export default Sidebar;
