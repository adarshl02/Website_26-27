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
import { Toaster} from 'sonner';
import AdminDashboard from "./adminPages/AdminDashboard";
import AdminRoute from "./components/general/AdminRoute";
import TermsAndConditions from "./pages/TermsAndConditions";
import { useSelector } from "react-redux";
import ContactUs from "./components/general/ContactUs";

const AppContent = ({ scrollToCarousel, scrollToLatest, latestRef, carouselRef,setBackdropOpen, deferredPrompt,
  showInstallPrompt }) => {
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
     {deferredPrompt && (
        <button 
          onClick={showInstallPrompt} 
          style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Install App
        </button>
      )}
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
            <Route
              path="/upcoming-event-page"
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
            />
          </Route>
  
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
    <Toaster richColors position="top-right" expand={true} />
      <BrowserRouter>
        <AppContent
          scrollToCarousel={scrollToCarousel}
          scrollToLatest={scrollToLatest}
          latestRef={latestRef}
          carouselRef={carouselRef}
          setBackdropOpen={setBackdropOpen}
          deferredPrompt={deferredPrompt}
          showInstallPrompt={showInstallPrompt}
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
    </>
  );
}

export default App;
