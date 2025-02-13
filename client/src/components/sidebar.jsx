import React from "react";
import {
  Menu,
  LayoutDashboard,
  Package,
  Users,
  Store,
  Palette,
  FileBarChart2,
  Settings,
  Database,
  Box,
  LogOut,
} from "lucide-react";
import square from "../assets/image.png";
import Customer from "../views/Customer";
export default function Sidebar({ url }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <img src={square} alt="" sizes={10} srcset="" />
        </div>

        <div className="px-3 text-sm text-gray-500">
          <div className="mb-2">Menu</div>
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                3
              </span>
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Package className="w-5 h-5 mr-3" />
              Stock
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-violet-600 bg-violet-50 rounded-lg"
            >
              <Users className="w-5 h-5 mr-3" />
              Customer
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Store className="w-5 h-5 mr-3" />
              Restaurant
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Palette className="w-5 h-5 mr-3" />
              Design
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <FileBarChart2 className="w-5 h-5 mr-3" />
              Report
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-5 h-5 mr-3" />
              Role & Admin
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </a>
          </nav>
        </div>

        <div className="px-3 mt-6">
          <div className="text-sm text-gray-500 mb-2">Integration</div>
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Database className="w-5 h-5 mr-3" />
              Stock
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Box className="w-5 h-5 mr-3" />
              Supply
            </a>
          </nav>
        </div>

        <div className="absolute w-64 p-4 border-t">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=faces"
              className="w-10 h-10 rounded-full"
              alt="Profile"
            />
            <div className="ml-3">
              <div className="font-medium">Savannah N</div>
              <div className="text-sm text-gray-500">Food Quality Manager</div>
            </div>
          </div>
          <button className="mt-4 flex items-center text-red-600 hover:text-red-700">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1">
        <div className="border-b bg-white">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex space-x-4">
              <button className="text-violet-600 px-3 py-2 rounded-lg hover:bg-violet-50">
                Customer
              </button>
              <button className="text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50">
                Promo
              </button>
              <button className="text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50">
                Voucher
              </button>
            </div>
          </div>
        </div>
        <Customer url={url} />
      </div>
    </div>
  );
}
