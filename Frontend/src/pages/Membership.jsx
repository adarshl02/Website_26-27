import { AnimatePresence, motion } from "framer-motion";
import RegistrationForm from "../components/general/RegistrationForm";
import { Backdrop, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchEventsByStatus } from "../service/api";
import { loadingEndsSuccess } from "../redux/loadinganderror/loadinganderrorSlice";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MembershipForm from "@/components/general/MembershipForm";

const Membership = () => {
    const [open, setOpen] = useState(false);
    const [perks, setPerks] = useState(false);
    const { loading } = useSelector((state) => state.loadinganderror);


      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className="md:mt-20 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-4 md:px-8 py-6 md:py-12">
            {/* Hero Section */}
            <div className="max-w-4xl text-center mb-6">
                <h1 className="py-1 text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
                    Membership Campaign
                </h1>
                {/* <div className="w-full flex justify-center">
          <img src="graffathon25.png" alt="image" className="md:w-96 w-48" />
        </div> */}
                <div className="text-sm text-slate-400 leading-relaxed font-medium font-poppins">
                    Club Pratibimb brings you a chance to be part of a it's vibrant and artistic community with our recruitment. Don't miss your moment to step into your creative destiny today!        </div>
            </div>

            {/* <div className="flex items-start gap-4 md:gap-8 mb-6 text-base md:text-2xl font-bold" >
        <div className="  mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent md:mr-4">
          Open for :
        </div>
        <div className=" mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent" >
          Fine Arts , &nbsp; Photography , &nbsp;  Content Writing, &nbsp;  Graphic Designing, &nbsp;  Event Management, &nbsp;  Video Editing, &nbsp;  Web Development
        </div>

      </div> */}

            {/* Event Details Section */}
            <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Event Image */}
                <div className="flex justify-center mx-4">
                    <img
                        src="https://res.cloudinary.com/dhy548whh/image/upload/v1742982525/c5tnukenlw3w3ycr7rxd.png"
                        alt="Upcoming Event Poster"
                        className="w-full object-contain rounded-lg shadow-lg"
                    />
                </div>

                {/* Event Information */}
                <div className="flex flex-col justify-start items-center md:items-start text-center md:text-left px-4 md:px-0">
                    <h2 className="text-2xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Recruitment Highlights
                    </h2>

                    {/* Event Details */}
                    <ul className="text-gray-300 text-sm md:text-lg mb-4 space-y-2 w-full max-w-md md:max-w-none text-left ml-8 md:ml-0">
                        <li>📅 <b>Date:</b> <span className="text-gray-400"> 30th March 2025</span></li>
                        <li>⏰ <b>Time:</b> <span className="text-gray-400">10 AM onwards</span></li>
                        <li>📍 <b>Venue:</b> <span className="text-gray-400">LT 002</span></li>
                        <li>💰 <b>Membership Fee:</b> <span className="text-gray-400">₹99</span></li>
                    </ul>

                    {/* Register Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpen}
                        disabled={loading}
                        className="relative flex justify-center items-center w-full md:w-auto mt-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 px-6 rounded-full shadow-lg font-bold transition duration-300 hover:opacity-90 hover:shadow-2xl"
                    >
                        {loading && <CircularProgress size={20} color="inherit" className="absolute" />}
                        <span className={loading ? "opacity-0" : "opacity-100"}>Claim Membership</span>
                    </motion.button>

                    {/* Additional Info */}
                    <ul className="list-disc pl-5 text-sm md:text-lg text-gray-400 mt-6 space-y-2 w-full max-w-md md:max-w-none text-left ml-8 md:ml-0 ">
                        <li> <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent text-lg" >
                            Membership Perks</span>
                            <button
                                onClick={() => setPerks(!perks)}
                                className="bg-white/10 rounded-lg ml-2 hover:bg-white/20 md:px-1"
                            >
                                {perks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </button>
                        </li>

                        <AnimatePresence>
                            {perks && (
                                <motion.ul
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden list-disc list-inside space-y-2 "
                                >
                                    <li> <span className="text-gray-300 font-medium font-poppins" >Join the Club</span>  – First step to being recognized as a club member.</li>
                                    <li><span className="text-gray-300 font-medium font-poppins" > Lifetime Membership</span>  – No renewals, valid forever!</li>
                                    <li><span className="text-gray-300 font-medium font-poppins" >Free Event Access </span> – Participate in events without extra registration costs.</li>
                                    <li>
                                        <span className="text-gray-300 font-medium font-poppins" > Auto Fee Deduction </span> – Event/workshop fees are automatically discounted when registered
                                        via the website.
                                    </li>
                                </motion.ul>
                            )}
                        </AnimatePresence>

                        <li>Here are the guideness: <a  target="_blank" 
    rel="noopener noreferrer" href="https://docs.google.com/document/d/1-CbmO8_jjMOlIZSfkGLyuedy1R3kuoT5I1ftmY4Xemk/edit?usp=sharing" className="text-blue-400" >Click here </a> </li>
                        <li>Last Date to register : 29th March, 2025</li>
                        <li>Open only for 2028 Batch of SGSITS</li>
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
                    <MembershipForm setOpen={setOpen} />
                </div>
            </Backdrop>
        </div>
    );
};

export default Membership;
