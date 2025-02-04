import { Outlet } from "react-router-dom"
import Banner from "../components/Service/Banner"
import Sidebar from "../components/Service/Sidebar"
import { LiaServicestack } from "react-icons/lia";
import { useContext, useEffect, useRef, useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { IndexContext } from "../context";

const ServiceLayout = () => {

  const { isSidebarOpen, setIsSidebarOpen } = useContext(IndexContext)

  const dropdownRef = useRef(null);

  // ক্লিকের মাধ্যমে মেনু টগল করা
  const toggleDropdown = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  // বাইরের জায়গায় ক্লিক করলে মেনু বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="">
        <Banner />
        <div className='flex gap-3 max-w-[1300px] mx-auto  px-4'>
          <div className="max-[640px]:hidden">
            <Sidebar />
          </div>
          <div className="w-full">
            <div className="border-b mb-5 flex justify-between text-sm mt-2.5">
              <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
                <LiaServicestack className="w-7 h-7" />
                <a href="#" className="font-semibold inline-block ">Services</a>
              </div>
              <div className=" max-[640px]:block">
                {/* Dropdown Button */}
                <button
                  onClick={toggleDropdown}
                  className=" px-4 py-2 cursor-pointer rounded-md min-[641px]:hidden"
                >
                  <MdMenuOpen className="w-8 h-8" />
                </button>

                {/* Dropdown Menu */}
                {isSidebarOpen && (
                  <div className="absolute z-50 min-[641px]:hidden left-0 mt-2 w-60 bg-white border rounded-md shadow-lg">
                    <Sidebar />
                  </div>
                )}
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceLayout