import React, { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { CardBody, CardContainer } from "../components/accertinityui/3d-card";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {
  authenticateGoogleLogin,
  authenticateGoogleSignup,
} from "../service/api";
import { toast } from "sonner";
import { adminLogin } from '../service/api2';
import GetAppIcon from '@mui/icons-material/GetApp';

export default function SignUp({ setBackdropOpen }) {
  const { loading } = useSelector((state) => state.user);

  const [loading2, setLoading2] = useState(false);
  const [formData, setFormData] = useState({});
  const [formData2, setFormData2] = useState({});
  const [err2, setErr2] = useState("");
  const [AdminAuthenticate, setAdminAuthenticate] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminLoading, setAdminLoading] = useState(false);

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();  // Prevent default browser install banner
      setDeferredPrompt(e);

      // Show the install prompt after a short delay
      setTimeout(() => {
        showInstallPrompt();
      }, 3000); // Show after 3 seconds (adjustable)
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const showInstallPrompt = () => {
    console.log("hi");

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  const handleAdminLogin = async () => {
    try {
      // Validate enrollment number
      if (!formData2.username || !formData2.password) {
        setErr2("All fields are required");
        return;
      }

      setErr2("");
      setAdminLoading(true);


      const response = await adminLogin(formData2);

      if (response.success) {
        dispatch(signInSuccess(response.data));
        navigate("/");
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAdminLoading(false);
    }
  }

  const handleGoogleSignUp = async () => {
    try {

      // Configure Google provider
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      // Initialize Firebase authentication
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      dispatch(signInStart());

      const response = await authenticateGoogleSignup({
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
        uid: result.user.uid,
      });

      if (response.success) {
        dispatch(signInSuccess(response.data));
        navigate("/");
        setBackdropOpen(true);
        toast.success(response.message);
      } else {
        dispatch(signInFailure(response.message));
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(signInFailure(response.message));
      toast.error("Could not sign up with google");
    }
  };


  const handleAdminChange = (e) => {
    setFormData2({
      ...formData2,
      [e.target.id]: e.target.value,
    });
    if (err2) {
      setErr2("");
    }

  };

  const handleGoogleLogin = async () => {
    setLoading2(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await authenticateGoogleLogin({
        email: result.user.email,
        uid: result.user.uid,
      });

      if (response.success) {
        dispatch(signInSuccess(response.data));
        navigate("/");
        toast.success(`Welcome back ${response.data.rest.name}`);
      } else {
        if (response.message === "Request failed with status code 404") {
          toast.error("User not found");
        } else toast.error(response.message || "Failed to sign in with Google");
        dispatch(signInFailure(response.message));
      }
    } catch (error) {
      dispatch(signInFailure(response?.message));
      toast.error("Could not sign up with Google. Please try again later.");
    } finally {
      setLoading2(false);
    }
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    handleResize();

    // Add listener
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const backgroundImage = isMobile
    ? "url('https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734950871/dihacrqgg1bkzoip1vay.png')"
    : "url('https://res.cloudinary.com/dhy548whh/image/upload/v1734195829/q0zdzie6fbvodeypqq7u.png')";

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center  bg-opacity-50"
      style={{
        // backgroundImage: "url('https://res.cloudinary.com/dhy548whh/image/upload/v1734195829/q0zdzie6fbvodeypqq7u.png')",
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      {/* Dark Overlay */}
      <div
        className={`absolute inset-0 bg-black ${isMobile ? "opacity-10" : "opacity-40"
          }`}
      ></div>

      {deferredPrompt && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={showInstallPrompt}
          className="fixed bottom-28 md:bottom-20 left-1/2 transform -translate-x-1/2 my-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
             text-white py-1 md:py-2 md:px-6 px-4 rounded-full shadow-lg text-sm font-poppins 
             transition duration-300 hover:opacity-90 hover:shadow-2xl flex items-center justify-center z-50"
        >
          Install App
          <GetAppIcon className="ml-2 text-white" />
        </motion.button>
      )}
      <div className="absolute inset-0 text-xl font-poppins flex justify-center items-end mb-16 md:mb-12 text-slate-300 md:text-white">
        Version 1.0.0
      </div>




      <CardContainer className="inter-var z-10">
        <CardBody className="text-black shadow-lg relative group/card  border-white/[0.1] w-[22rem] sm:w-[30rem] h-auto rounded-xl p-6">
          <div className="bg-slate-50 p-4 md:p-8 rounded-lg  w-full text-black text-sm">
            <img
              src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195806/mhwkdrs7niz9yxhrafq8.png"
              alt="Logo"
              className="w-24 mx-auto mb-2 md:mb-4"
            />

            {!AdminAuthenticate ? (
              <div>
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold font-serif">Register</h2>
                </div>

                <form>

                  <div className="text-center text-xs md:text-sm text-gray-600 mb-4">
                    One Time Registration
                  </div>
                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    disabled={loading}
                    className={`bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-slate-100 w-full flex items-center justify-center bg-blue-800 py-1 md:py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-base ${loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <>
                        <img
                          src="https://www.svgrepo.com/show/355037/google.svg"
                          alt="Google logo"
                          className="w-5 h-5 mr-2"
                        />
                        <span>Sign up with Google</span>
                      </>
                    )}
                  </button>

                </form>

                <div className="relative my-2 md:my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-slate-50 px-2 text-gray-600 ">OR</span>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-600">
                  <div className="mb-2 text-xs md:text-sm" >
                    Already Have an Account? Login with{" "}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={loading2}
                      className={`text-sm w-full flex items-center justify-center bg-gray-200 py-1 md:py-2 rounded-lg hover:bg-gray-300  transition duration-300 text-base text-slate-800 ${loading2 ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                      {loading2 ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <>
                          <GoogleIcon className="w-5 h-5 mr-2" />
                          <span>Login with Google</span>
                        </>
                      )}

                    </button>
                  </div>
                </div>

                <div
                  className="cursor-pointer mt-6 flex items-center justify-center text-blue-600 hover:text-blue-700 transition duration-200"
                  onClick={() => setAdminAuthenticate(true)}
                >
                  Admin login
                  <ArrowCircleRightIcon className="ml-2" />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-black">Admin Login</h2>
                </div>
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-left font-medium text-black mb-2"
                    >
                      Admin Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="md:mt-1 w-full px-4 py-2 ring ring-blue-200  text-slate-800   rounded-lg  text-base focus:ring focus:ring-blue-400 focus:outline-none"
                      placeholder="admin@example.com"
                      onChange={handleAdminChange}

                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-left font-medium text-black mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="md:mt-1 w-full px-4 py-2 ring ring-blue-200  text-slate-800   rounded-lg  text-base focus:ring focus:ring-blue-400 focus:outline-none"
                      onChange={handleAdminChange}
                      placeholder="Enter your password"
                    />
                    {err2 && (
                      <div className="text-red-500 text-xs flex justify-start mt-2">{err2}</div>
                    )}
                  </div>


                  <div className="flex justify-between items-center mb-2">
                    <div
                      className="cursor-pointer text-blue-800 hover:text-blue-900 transition duration-200"
                      onClick={() => setAdminAuthenticate(false)}
                    >
                      User Login
                      <ArrowCircleRightIcon className="ml-2" />
                    </div>
                    <button
                      type="button"
                      onClick={handleAdminLogin}
                      disabled={adminLoading}
                      className="w-[6rem] px-6 py-2 bg-blue-700 text-slate-50 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300"
                    >
                      {adminLoading ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
