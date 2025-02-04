import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";


const DashboardLayout = () => {
  return (
    <div className="relative h-full  min-h-screen font-[sans-serif] max-w-[1300px] mx-auto  px-4">
      <div className="flex items-start">
        {/* Navbar */}
        <Sidebar />
        <section className="main-content w-full ">
          {/* Body Header */}
          <div className="my-2 max-h-[750px] scrollbar-hidden  px-2">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardLayout;
