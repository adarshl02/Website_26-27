import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Sponsors from "./pages/Sponsors";
import { NavbarDemo } from "./components/general/NavbarDemo";
import Footer from "./components/general/Footer";
import Blogs from "./pages/Blogs";
import ArtCommunity from "./pages/ArtCommunity";
import UpcomingEventPage from "./pages/UpcomingEventPage";
import PrivateRoute from "./components/general/PrivateRoute";
import { ProtectedRoute } from "./components/general/ProtectedRoute";
import { Backdrop, Typography, Box } from "@mui/material";
import Navigation from "./components/general/Navigation";
import { Toaster } from 'sonner';
import AdminDashboard from "./adminPages/AdminDashboard";
import AdminRoute from "./components/general/AdminRoute";
import TermsAndConditions from "./pages/TermsAndConditions";
import { useSelector } from "react-redux";
import ContactUs from "./components/general/ContactUs";
import Membership from "./pages/Membership";
import DeleteAccount from "./components/general/DeleteAccount";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const AppContent = ({ scrollToCarousel, scrollToLatest, latestRef, carouselRef, setBackdropOpen }) => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const isAuthenticated = !!currentUser;
  const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.1 } },
  };

  return (
    <>

      {location.pathname !== "/sign-up" && isAuthenticated && (
        <>
          <Navigation />
          <NavbarDemo scrollToCarousel={scrollToCarousel} />
        </>
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route element={<PrivateRoute />}>
            
            <Route
              path="/profile"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <Profile />
                    <Footer />
                  </motion.div>
                </>
              }
            />
            <Route
              path="/events"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <Events />
                    <Footer />
                  </motion.div>
                </>
              }
            />
            <Route
              path="/team"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <Team />
                    <Footer />
                  </motion.div>
                </>
              }
            />
            <Route
              path="/sponsors"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <Sponsors />
                    <Footer />
                  </motion.div>
                </>
              }
            />
            <Route
              path="/blogs"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <Blogs />
                    <Footer />
                  </motion.div>
                </>
              }
            />
            <Route
              path="/art-community"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <ArtCommunity />
                    <Footer />
                  </motion.div>
                </>
              }
            />
            <Route
              path="/terms-and-conditions"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <TermsAndConditions />
                    <Footer />
                  </motion.div>
                </>
              }
            />
            
             <Route
              path="/delete-account"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <DeleteAccount />
                    <Footer />
                  </motion.div>
                </>
              }
            />
            {/* <Route
              path="/asdfghjkl"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <UpcomingEventPage />
                    <Footer />
                  </motion.div>
                </>
              }
            /> */}
            {/* <Route
              path="/membership"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <Membership />
                    <Footer />
                  </motion.div>
                </>
              }
            /> */}
          </Route>

          <Route
              path="/"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <Home
                      carouselRef={carouselRef}
                      latestRef={latestRef}
                      scrollToLatest={scrollToLatest}
                    />
                    <Footer />
                  </motion.div>
                </>
              }
            />

            <Route
              path="/privacy-policy"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <PrivacyPolicy />
                    <Footer />
                  </motion.div>
                </>
              }
            />
            <Route
              path="/contact-us"
              element={
                <>
                  <motion.div
                    initial={pageTransition.initial}
                    animate={pageTransition.animate}
                    exit={pageTransition.exit}
                  >
                    <ContactUs />
                    <Footer />
                  </motion.div>
                </>
              }
            />

          <Route element={<AdminRoute />}>
            <Route
              path="/admin-dashboard"
              element={
                <motion.div
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                >
                  <AdminDashboard />
                </motion.div>
              }
            />

          </Route>

          <Route
            path="/sign-up"
            element={
              <motion.div
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                exit={pageTransition.exit}
              >
                <ProtectedRoute>
                  <SignUp setBackdropOpen={setBackdropOpen} />
                </ProtectedRoute>
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  const latestRef = useRef(null);
  const carouselRef = useRef(null);


  const scrollToLatest = () => {
    if (latestRef.current) {
      const yOffset = -80; // Adjust this value according to your navbar's height
      const yPosition =
        latestRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  const scrollToCarousel = () => {
    if (carouselRef.current) {
      const yOffset = -80; // Adjust this value according to your navbar's height
      const yPosition =
        carouselRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  const [backdropOpen, setBackdropOpen] = useState(false);
  // const [backdropOpen2, setBackdropOpen2] = useState(true);

  return (
    <>
      <Toaster richColors position="top-right" expand={true} />
      <BrowserRouter>
        <AppContent
          scrollToCarousel={scrollToCarousel}
          scrollToLatest={scrollToLatest}
          latestRef={latestRef}
          carouselRef={carouselRef}
          setBackdropOpen={setBackdropOpen}
        />
      </BrowserRouter>

      <Backdrop
        open={backdropOpen}
        onClick={() => setBackdropOpen(false)}
        style={{ zIndex: 1200 }}
      >
        <Box
          sx={{
            bgcolor: "#ffffffdd", // Slightly transparent white
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)", // Soft shadow
            p: 2,
            borderRadius: "16px", // Rounded corners
            textAlign: "center",
            width: "80%", // Less than full width
            maxWidth: "500px", // Maximum width to avoid excessive stretching
            animation: "fadeIn 0.5s ease-out", // Animation for smooth entrance
          }}
        >
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{
              color: "#333", // Darker text color
              fontFamily: "'Cinzel', serif", // Elegant font for art club
              fontWeight: "bold",
            }}
          >
            Welcome to Pratibimb!
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              color: "#555", // Slightly lighter text color
              fontFamily: "'Roboto', sans-serif", // Clean and modern font
            }}
          >
            We encourage you to explore your <b>mailbox</b> and{" "}
            <b>profile section</b> of the website. Every activity on the website
            is reflected here.
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              color: "#888", // Subtle text color
              fontStyle: "italic", // Add some flair
              fontFamily: "'Roboto', sans-serif",
              marginTop: "1rem",
            }}
          >
            "Happy Clicking"
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              color: "#555", // Slightly lighter text color
              fontFamily: "'Roboto', sans-serif", // Clean and modern font
              marginTop: "0.5rem",
            }}
          >
            Click outside to continue.
          </Typography>
        </Box>
      </Backdrop>
      {/* <Backdrop
  open={backdropOpen2}
  onClick={() => setBackdropOpen2(false)}
  className="z-[1200] flex items-center justify-center"
>
  <div className="bg-white/90 shadow-lg p-6 rounded-2xl text-center w-4/5 max-w-md animate-fadeIn">
    <h3 className="text-2xl font-bold text-gray-800 font-cinzel">
      Free Registration for Recruitments
    </h3>
    <ul className="text-left text-gray-600 mt-4 list-disc pl-5 font-roboto">
      <li><b>Date:</b> 30 March, 2025</li>
      <li><b>Time:</b> 10:00 AM onwards</li>
      <li><b>Venue:</b> LT 002</li>
    </ul>
    <button
      onClick={() => (window.location.href = "/membership")}
      className="mt-4 px-4 py-2 bg-blue-700 text-white font-bold rounded-lg cursor-pointer text-sm"
    >
      Register Now
    </button>
    <p className="text-gray-600 mt-2 font-roboto">Click outside to continue.</p>
  </div>
</Backdrop> */}

    </>
  );
}

export default App;
