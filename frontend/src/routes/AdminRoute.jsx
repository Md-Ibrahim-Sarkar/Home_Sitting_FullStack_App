import { RiLoaderLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { users, isLoading } = useSelector(store => store.user);
  const location = useLocation();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <RiLoaderLine className="animate-spin text-6xl" />
    </div>
  }


  if (users?.role === "admin") {
    return children;
  }

  return <Navigate to="/login" state={location.pathname} />;
};

export default AdminRoute;
