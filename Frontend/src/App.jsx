import React, { useRef, useState } from "react";
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
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Backdrop, Typography, Box } from "@mui/material";

const AppContent = ({ scrollToCarousel, scrollToLatest, latestRef, carouselRef }) => {
  const location = useLocation(); 
  const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.1 } },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                ><NavbarDemo scrollToCarousel={scrollToCarousel} />
                  <Home
                    carouselRef={carouselRef}
                    latestRef={latestRef}
                    scrollToLatest={scrollToLatest}
                  />
                  <Footer />
                </motion.div>
              }
            />
            <Route
              path="/profile"
              element={
                <motion.div
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                > 
                  <NavbarDemo scrollToCarousel={scrollToCarousel} />
                  <Profile />
                  <Footer />
                </motion.div>
              }
            />
            <Route
              path="/events"
              element={
                <motion.div
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                > 
                  <NavbarDemo scrollToCarousel={scrollToCarousel} />
                  <Events />
                  <Footer />
                </motion.div>
              }
            />
            <Route
              path="/team"
              element={
                <motion.div
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                > 
                <NavbarDemo scrollToCarousel={scrollToCarousel} />
                  <Team />
                  <Footer />
                </motion.div>
              }
            />
            <Route
              path="/sponsors"
              element={
                <motion.div
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                > 
                <NavbarDemo scrollToCarousel={scrollToCarousel} />
                  <Sponsors />
                  <Footer />
                </motion.div>
              }
            />
            <Route
              path="/blogs"
              element={
                <motion.div
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                > <NavbarDemo scrollToCarousel={scrollToCarousel} />
                  <Blogs />
                  <Footer />
                </motion.div>
              }
            />
            <Route
              path="/art-community"
              element={
                <motion.div
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                > <NavbarDemo scrollToCarousel={scrollToCarousel} />
                  <ArtCommunity />
                  <Footer />
                </motion.div>
              }
            />
            <Route
              path="/upcoming-event-page"
              element={
                <motion.div
                  initial={pageTransition.initial}
                  animate={pageTransition.animate}
                  exit={pageTransition.exit}
                > <NavbarDemo scrollToCarousel={scrollToCarousel} />
                  <UpcomingEventPage />
                  <Footer />
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
                  <SignUp />
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

  return (
    <>
      <BrowserRouter>
        <AppContent
          scrollToCarousel={scrollToCarousel}
          scrollToLatest={scrollToLatest}
          latestRef={latestRef}
          carouselRef={carouselRef}
        />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
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
    </>
  );
}

export default App;
