import React, { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { ThreeDCardDemo } from "./test";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/general/PrivateRoute";
import { ProtectedRoute } from "./components/general/ProtectedRoute";
import Events from "./pages/Events";
import Team from './pages/Team';
import Sponsors from "./pages/Sponsors";
import { NavbarDemo } from './components/general/NavbarDemo';
import Footer from './components/general/Footer';

function App() {
  const latestRef = useRef(null);
  const feedbackRef = useRef(null);

  const scrollToLatest = () => {
    if (latestRef.current) {
      const yOffset = -80; // Adjust this value according to your navbar's height
      const yPosition = latestRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  const scrollToFeedback = () => {
    if (feedbackRef.current) {
      const yOffset = -80; // Adjust this value according to your navbar's height
      const yPosition = feedbackRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={
              <>
               <NavbarDemo scrollToLatest={scrollToLatest} scrollToFeedback={scrollToFeedback} />
               <Home latestRef={latestRef} feedbackRef={feedbackRef} />
                <Footer />
              </>
            } />
            <Route path="/profile" element={<><NavbarDemo/><Profile /><Footer/></>} />
            <Route path="/events" element={<><NavbarDemo/><Events/><Footer/></>} />
            <Route path="/team" element={<><NavbarDemo/><Team/><Footer/></>} />
            <Route path="/sponsors" element={<><NavbarDemo/><Sponsors/><Footer/></>} />
          </Route>
          
          <Route path="/sign-up" element={<ProtectedRoute><SignUp /></ProtectedRoute>} />
          <Route path="/test" element={<ThreeDCardDemo />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
