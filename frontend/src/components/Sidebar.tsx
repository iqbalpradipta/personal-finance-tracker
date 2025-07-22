import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MdDashboard } from "react-icons/md";
import { FaScroll, FaUserPlus } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { LuWallet } from "react-icons/lu";
import { RiLogoutBoxLine } from "react-icons/ri";

function Sidebar() {
  const pathname = usePathname();

  const getNavLink = (href: string) => {
    const isActive = pathname === href;

    const linkClasses = `
      flex items-center py-2.5 px-6 mx-3 rounded-lg
      font-medium text-sm transition-all duration-200 ease-in-out
      ${
        isActive
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }
    `;

    const iconClasses = `mr-4 ${
      isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
    }`;

    return { linkClasses, iconClasses };
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-blue-100 shadow-xl overflow-y-auto">
      <div className="flex items-center p-6 border-b border-blue-100 bg-blue-500">
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
        <span className="text-lg font-bold text-gray-100 tracking-wide">
          Personal Finance
        </span>
      </div>

      <nav className="py-4">
        <div className="mb-6">
          <h3 className="text-xs font-medium uppercase text-gray-500 px-6 mb-3">
            Home
          </h3>
          <ul>
            <li className="mb-1">
              <Link href="/" className={getNavLink("/").linkClasses}>
                <span className={getNavLink("/").iconClasses}>
                  <MdDashboard className="h-5 w-5" />
                </span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="mb-1">
              <Link
                href="/transaction"
                className={getNavLink("/transaction").linkClasses}
              >
                <span className={getNavLink("/transaction").iconClasses}>
                  <FaScroll className="h-5 w-5" />
                </span>
                <span>Transaction</span>
              </Link>
            </li>
            <li className="mb-1">
              <Link
                href="/wallets"
                className={getNavLink("/wallets").linkClasses}
              >
                <span className={getNavLink("/wallets").iconClasses}>
                  <LuWallet className="h-5 w-5" />
                </span>
                <span>Wallets</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-medium uppercase text-gray-500 px-6 mb-3">
            Authentication
          </h3>
          <ul>
            <li className="mb-1">
              <Link href="/login" className={getNavLink("/login").linkClasses}>
                <span className={getNavLink("/login").iconClasses}>
                  <CiLogin className="h-5 w-5" />
                </span>
                <span>Login</span>
              </Link>
            </li>
            <li className="mb-1">
              <Link
                href="/register"
                className={getNavLink("/register").linkClasses}
              >
                <span className={getNavLink("/register").iconClasses}>
                  <FaUserPlus className="h-5 w-5" />
                </span>
                <span>Register</span>
              </Link>
            </li>
            <li className="mb-1">
              <Link
                href="/logout"
                className={getNavLink("/logout").linkClasses}
              >
                <span className={getNavLink("/logout").iconClasses}>
                  <RiLogoutBoxLine className="h-5 w-5" />
                </span>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Create By Iqbal Pradipta.
      </div>
    </div>
  );
}

export default Sidebar;
