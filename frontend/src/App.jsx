import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Register from "./pages/Register"
import Home from "./pages/Home"
import LogIn from "./pages/LogIn"
import Navbar from "./components/Navbar"
import Services from "./pages/Services"
import { ToastContainer } from "react-toastify"
import PrivateRoute from "./routes/PrivateRoute"
import { useUserCheckApi } from "./features/users/userApi"
import { useEffect } from "react"
import { RiLoaderLine } from "react-icons/ri";
import { useSelector } from "react-redux"
import UpdateProfile from "./components/UpdateProfile"
import Footer from "./components/Footer"
import DashboardServices from "./components/Dashboard/service/Services"
import Add_Service from "./components/Dashboard/service/Add_Service"
import DashboardLayout from "./layout/DashboardLayout"
import ReviewSection from "./components/other-section/ReviewSection"
import DetailsPage from "./components/Service/DetailsPage"
import My_Services from "./components/Dashboard/service/My_Services"
import UsersList from "./components/Dashboard/UsersList"
import AdminRoute from "./routes/AdminRoute"
import All_Services from "./components/Service/All_Services"
import CategoryByServices from "./components/Service/CategoryByServices"
import My_Booking_Service from "./components/Dashboard/service/My_Booking_Service"
import My_Orders from "./components/Dashboard/service/My_Orders"
import WishList from "./components/Dashboard/WishList"
import Contact_Us from "./components/Contact_Us"
import ErrorPage from "./components/ErrorPage"
import { Helmet } from "react-helmet";


const App = () => {

  const location = useLocation()

  const pathSegments = location.pathname.split("/"); // "/" দিয়ে path ভাগ করা
  const pathName = pathSegments[pathSegments.length - 1] || "Home"; // সর্বশেষ অংশ নেওয়া
  const path = pathName.replace('-', ' ')


  const { users } = useSelector((store) => store.user);

  const checkApi = useUserCheckApi();

  useEffect(() => {
    checkApi();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Sitting | {path.charAt(0).toUpperCase() + path.slice(1)}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Navbar />
      <div className="">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!users ? <LogIn /> : <Navigate to="/" />} />
          <Route path="/register" element={!users ? <Register /> : <Navigate to="/update-profile" />} />
          <Route path="/services/details/:id" element={<DetailsPage />} />
          <Route path="/contact-us" element={<Contact_Us />} />

          {/* services Routes (With Layout) */}
          <Route path="/services" element={<Services />} >
            <Route index element={<All_Services />} />
            <Route path="/services/:category" element={<CategoryByServices />} />
          </Route>

          {/* Private Dashboard Routes (With Layout) */}
          <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route index element={<DashboardServices />} />
            <Route path="add-service" element={<Add_Service />} />
            <Route path="my-services" element={<My_Services />} />
            <Route path="my-booking-services" element={<My_Booking_Service />} />
            <Route path="my-orders" element={<My_Orders />} />
            <Route path="wishlist" element={<WishList />} />

            <Route path="users-list" element={<AdminRoute> <UsersList /> </AdminRoute>} />

          </Route>


          {/* Update Profile */}
          <Route path="/update-profile" element={users ? <UpdateProfile /> : <Navigate to="/login" />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <ReviewSection />

      <Footer />
      <ToastContainer />
    </>
  )
}

export default App