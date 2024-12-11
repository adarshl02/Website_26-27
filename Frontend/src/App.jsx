import React, { useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { ThreeDCardDemo } from "./test";
import { ToastContainer,Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/general/PrivateRoute";
import { ProtectedRoute } from "./components/general/ProtectedRoute";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Sponsors from "./pages/Sponsors";
import { NavbarDemo } from "./components/general/NavbarDemo";
import Footer from "./components/general/Footer";
import { Backdrop, Typography, Box} from "@mui/material";

function App() {
  const latestRef = useRef(null);
  const feedbackRef = useRef(null);
  const aboutUsRef = useRef(null);
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

  const scrollToFeedback = () => {
    if (feedbackRef.current) {
      const yOffset = -80; // Adjust this value according to your navbar's height
      const yPosition =
        feedbackRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };
  const scrollToAboutUs = () => {
    if (aboutUsRef.current) {
      const yOffset = -80; // Adjust this value according to your navbar's height
      const yPosition =
      aboutUsRef.current.getBoundingClientRect().top +
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
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <>
                  <NavbarDemo
                    scrollToFeedback={scrollToFeedback}
                    scrollToAboutUs={scrollToAboutUs}
                    scrollToCarousel={scrollToCarousel}
                  />
                  <Home carouselRef={carouselRef} latestRef={latestRef} feedbackRef={feedbackRef} aboutUsRef={aboutUsRef} scrollToLatest={scrollToLatest} />
                  <Footer />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <NavbarDemo />
                  <Profile />
                  <Footer />
                </>
              }
            />
            <Route
              path="/events"
              element={
                <>
                  <NavbarDemo />
                  <Events />
                  <Footer />
                </>
              }
            />
            <Route
              path="/team"
              element={
                <>
                  <NavbarDemo />
                  <Team />
                  <Footer />
                </>
              }
            />
            <Route
              path="/sponsors"
              element={
                <>
                  <NavbarDemo />
                  <Sponsors />
                  <Footer />
                </>
              }
            />
            <Route
              path="/test"
              element={
                <>
                  <NavbarDemo />
                  <ThreeDCardDemo />
                  <Footer />
                </>
              }
            />
          </Route>

          <Route
            path="/sign-up"
            element={
              <ProtectedRoute>
                <SignUp setBackdropOpen={setBackdropOpen} />
              </ProtectedRoute>
            }
          />
        </Routes>
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
        transition = {Zoom}
      />
     <Backdrop open={backdropOpen} onClick={() => setBackdropOpen(false)} style={{ zIndex: 1200 }}>
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
      We encourage you to explore your <b>mailbox</b> and <b>profile section</b> of website. Every activity on the website is reflected here.
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
