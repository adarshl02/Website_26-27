import { motion } from "framer-motion";
import RegistrationForm from "../components/general/RegistrationForm";
import { Backdrop } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchEventsByStatus } from "../service/api";
import { ongoingFailure, ongoingStart, ongoingSuccess } from "../redux/events/eventsSlice";

const UpcomingEventPage = () => {

    const [open, setOpen] = useState(false);
    const { ongoing } = useSelector((state) => state.events);
    const { token } = useSelector((state) => state.user.currentUser);
    
    
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
            ongoingStart();
            console.log("hi");
            
            const response = await fetchEventsByStatus("ONGOING",token);
            if (response.success) {
              dispatch(ongoingSuccess(response.data));
            } else {
               dispatch(ongoingFailure(response.message));
               console.error("Failed to fetch events:", response.message);
              console.log('Failed to fetch event');
              
            }
          } catch (error) {
            // dispatch(ongoingFailure(response.error));
            // console.error("Error fetching events:", error);
            console.log('Failed to fetch event');
          }
        };
        if (!ongoing) { 
          fetchData();
        }
      }, []);

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-4 md:px-8 py-6 md:py-12">
      {/* Hero Section */}
      <div className="max-w-4xl text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
          Pratibimb's Upcoming Event
        </h1>
        <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
          Join us for an extraordinary celebration of art, culture, and
          creativity! Be part of the biggest event where imagination meets
          reality. Experience vibrant performances, stunning exhibitions, and
          endless inspiration.
        </p>
      </div>

      {/* Event Details Section */}
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Event Image */}
        <div className="flex justify-center">
          <img
            src="/sepia_poster.png"
            alt="Upcoming Event Poster"
            className="w-64 max-w-sm object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Event Information */}
        <div className="flex flex-col justify-start items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Event Highlights
          </h2>
          <ul className="text-gray-300 text-sm md:text-lg mb-6 space-y-2">
            <li>🎨 Art Workshops by Renowned Artists</li>
            <li>🎭 Cultural Performances</li>
            <li>📸 Live Photo Booth and Galleries</li>
            <li>🛍️ Exclusive Merchandise and Giveaways</li>
          </ul>
          <p className="text-sm md:text-base text-gray-400 italic">
            Tentative Date: February 2024
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="mt-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-3 px-6 rounded-full shadow-lg font-bold transition duration-300 hover:opacity-90 hover:shadow-2xl"
          >
            Register Now
          </motion.button>
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
