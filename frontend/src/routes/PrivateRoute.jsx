import { RiLoaderLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { users, isLoading } = useSelector(store => store.user);
  const location = useLocation();
  const navigate = useNavigate()


  console.log("Previous Page:", location);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <RiLoaderLine className="animate-spin text-6xl" />
    </div>
  }


  if (users !== null) {
    return children;
  }

  if (users) return <Navigate to={location.pathname} />;

  navigate("/login", { replace: true });

};

export default PrivateRoute;
