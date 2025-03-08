// import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../../assets/images/logo.png'
import GoogleIcon from "../../components/auth/GoogleIcon";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { axiosInstance } from "../../lib/axiosInstanace";

const LogIn = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form);

    try {
      await signIn(formData.email, formData.password)
        .then(user => {
          console.log(user)
        })
      toast.success("Sign In Successful")
      navigate(from, { replace: true })
    } catch (error) {
      toast.error('Login failed: ' + error.message)
    }

  }

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential?.user;
      const userData = {
        fullName: user?.displayName,
        email: user?.email,
        profilePic: user?.photoURL,
        uid: user?.uid,  // Ensure UID is set correctly
        role: "user"
      };
      if (userData.uid) {  // Check if UID is valid
        const addUserInfo = async () => {
          try {
            const res = await axiosInstance.post('/auth/user', userData);
            console.log(res);
          } catch (error) {
            console.error("Error adding user:", error);
          }
        };
        addUserInfo();
        toast.success("Google Sign In Successful");
        navigate("/");
      } else {
        toast.error("Google Sign-In failed. UID not found.");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In Failed");
    }
  };



  return (
    <>
      <div className=" py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div className="relative px-4 py-10 dark:bg-gray-900 bg-white shadow-lg sm:rounded-3xl sm:p-10 md:px-10">

            <div className="max-w-md mx-auto">

              <div>
                <h1 className="text-2xl text-center  font-semibold">Log In</h1>
              </div>
              <div className="divide-y ">
                <div className="py-8 text-base leading-6 space-y-4  sm:text-lg sm:leading-7">
                  <form className="space-y-4" onSubmit={handleSignIn}>

                    <div className="relative">
                      <input id="email" name="email" type="text" className="peer placeholder-transparent bg-white dark:bg-gray-900 h-10 w-full md:w-96 border-b-2 border-gray-300  focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                      <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                    </div>
                    <div className="relative">
                      <input id="password" name="password" type="password" className="peer placeholder-transparent bg-white dark:bg-gray-900 h-10 w-full md:w-96 border-b-2 border-gray-300  focus:outline-none focus:borer-rose-600" placeholder="Password" />
                      <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                    </div>
                    <div className="relative">
                      <button className="bg-cyan-500 text-white rounded-md px-2 py-1">Submit</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
            <div className="mb-4 flex items-center gap-4">
              <hr className="w-full border-gray-300" />
              <p className="text-sm text-gray-800 text-center">or</p>
              <hr className="w-full border-gray-300" />
            </div>
            <div className="w-full flex justify-center">
              <button onClick={handleGoogleSignIn} className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>
            </div>
            <p className=" text-sm !mt-8 text-center">Don't have an account? <Link to={'/register'} class="text-cyan-500 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogIn