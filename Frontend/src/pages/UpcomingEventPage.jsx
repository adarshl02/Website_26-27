import { motion } from "framer-motion";
import RegistrationForm from "../components/general/RegistrationForm";
import { Backdrop, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchEventsByStatus } from "../service/api";
import { loadingEndsSuccess } from "../redux/loadinganderror/loadinganderrorSlice";

const UpcomingEventPage = () => {
  const [open, setOpen] = useState(false);
  const { token } = useSelector((state) => state.user.currentUser);
  const { loading } = useSelector((state) => state.loadinganderror);
  const [ongoing, setOngoing] = useState(null);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {

        dispatch(loadingEndsSuccess());


        const response = await fetchEventsByStatus("ONGOING", token);
        if (response.success) {
          setOngoing(response.data);
        } else {
          console.error("Failed to fetch events:", response?.message);
        }
      } catch (error) {
        console.log("Failed to fetch event");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="md:mt-20 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-4 md:px-8 py-6 md:py-12">
      {/* Hero Section */}
      <div className="max-w-4xl text-center mb-6">
        {/* <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
          Pratibimb's Upcoming Event
        </h1> */}
        <div className="w-full flex justify-center">
          <img src="graffathon25.png" alt="image" className="md:w-96 w-48" />
        </div>
        <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
          Immerse yourself in a 33-hour whirlwind of colors and creativity, where imagination takes form and every brushstroke tells a story. Join us in making history as we set on this unwavering legacy !
        </p>
      </div>

      <div className="flex items-start gap-4 md:gap-8 mb-6 text-base md:text-2xl font-bold" >
        <div className="  mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent md:mr-4">
          Theme:
        </div>
        <div className=" mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent" >
          Abstract Art &nbsp; | &nbsp; Women Empowerment  &nbsp; | &nbsp;  Science Fiction
        </div>

      </div>

      {/* Event Details Section */}
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Event Image */}
        <div className="flex justify-center mx-4">
          <img
            src="graffathon25poster.png"
            alt="Upcoming Event Poster"
            className="w-full max-w-sm object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Event Information */}
        <div className="flex flex-col justify-start items-center md:items-start text-center md:text-left px-4 md:px-0">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Event Highlights
          </h2>

          {/* Event Details */}
          <ul className="text-gray-300 text-sm md:text-lg mb-4 space-y-2 w-full max-w-md md:max-w-none text-left ml-8 md:ml-0">
            <li>📅 <b>Date:</b> <span className="text-gray-400"> 8th - 9th March 2025</span></li>
            <li>⏰ <b>Time:</b> <span className="text-gray-400">9 AM onwards</span></li>
            <li>📍 <b>Venue:</b> <span className="text-gray-400">Electrical and Mechanical Garden, SGSITS, Indore</span></li>
            <li>👥 <b>Team Size:</b> <span className="text-gray-400">6-8 members</span></li>
            <li>💰 <b>Registration Fee:</b> <span className="text-gray-400">₹99 (Kit cost = ₹699)</span></li>
          </ul>

          {/* Register Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            disabled={loading}
            className="relative flex justify-center items-center w-full md:w-auto mt-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 px-6 rounded-full shadow-lg font-bold transition duration-300 hover:opacity-90 hover:shadow-2xl"
          >
            {loading && <CircularProgress size={20} color="inherit" className="absolute" />}
            <span className={loading ? "opacity-0" : "opacity-100"}>Register Now for ₹99</span>
          </motion.button>

          {/* Additional Info */}
          <ul className="list-disc pl-5 text-sm md:text-lg text-gray-400 mt-6 space-y-2 w-full max-w-md md:max-w-none text-left ml-8 md:ml-0 ">
            <li>Each team must submit artwork on an A4-sized painted sheet by 3 March 2025.</li>
            <li>The registration fee is non-refundable; i.e., if the artwork is rejected, the money won’t be refunded to the team.
            </li>
            <li>Register now through our website or visit our registration desk near Gym and Cafe 91.</li>
            <li>
              Kindly read the rules and regulations:
              <a
                href="https://tinyurl.com/mrytanh4"
                className="text-blue-500 underline ml-1 break-words"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://tinyurl.com/mrytanh4
              </a>
            </li>
            <li>For queries, DM us or contact: 883-9830466, 88788 06294</li>
          </ul>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-12 text-gray-500 text-center text-sm">
        Stay tuned for more updates! Follow us on our social media channels for
        the latest announcements.
      </div>

      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={open}
        onClick={handleClose}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <RegistrationForm event_id={ongoing?.event_id} setOpen={setOpen} />
        </div>
      </Backdrop>
    </div>
  );
};

export default UpcomingEventPage;
