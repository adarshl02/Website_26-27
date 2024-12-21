import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Meteors } from "./../components/accertinityui/Meteor";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Backdrop } from "@mui/material";
import Membershiptrial from "./../components/general/Backdrops/Membershiptrial";

export default function Profile() {
  const { rest: user } = useSelector((state) => state.user.currentUser); // Assuming user data is stored in the redux state
  const perks = useRef(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();

  const scrollToPerks = () => {
    if (perks.current) {
      const yOffset = -80; // Adjust this value according to your navbar's height
      const yPosition =
        perks.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className="p-2 md:p-4  mt-16">
      <div className="text-center py-2 bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
        My Profile
      </div>

      {/* Profile Section */}
      {/* Profile Card */}
      <div className="relative w-full">
        <div className="py-2 relative shadow-xl bg-gray-900 border rounded-full border-gray-800 flex justify-around items-center text-white overflow-hidden">
          <div className="pl-8 md:pl-0 py-2 ">
            {" "}
            <p className="text-sm font-poppins md:text-2xl font-medium  relative">
              {user.name}
            </p>
            <p className="text-xs md:text-lg text-slate-400  relative">
              {user.email}
            </p>
            <p className="text-xs md:text-lg text-slate-400  relative">
              Batch: {user.batch}
            </p>
            <p className="text-xs md:text-lg text-slate-400 relative">
              Branch: {user.branch}
            </p>
            //TODO:
            <div className="flex flex-wrap items-center space-x-6 text-xs md:text-lg relative">
              <div className="flex items-center text-xs text-slate-400">
                <span>Non-Member</span>
                <button
                  onClick={scrollToPerks}
                  className="hidden md:inline-flex  items-center md:px-4 md:py-2 bg-yellow-400 text-slate-800 font-poppins rounded-2xl hover:bg-yellow-300 ml-2"
                >
                  Claim your membership now
                  <ArrowForwardIcon className="ml-2" />
                </button>
              </div>

              <div className="flex items-center text-xs text-slate-400">
                <span>Non-Artist</span>
                <button className="hidden md:inline-flex text-sm items-center bg-yellow-400 text-slate-800 font-poppins rounded-2xl hover:bg-yellow-300 ml-2">
                  Become an Artist
                  <ArrowForwardIcon className="ml-2" />
                </button>
              </div>
            </div>
          </div>

          <div className="">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-gray-700 shadow-md"
            />
          </div>

          {/* Meaty part - Meteor effect */}
          <div className="absolute inset-0 overflow-hidden">
            <Meteors number={20} />
          </div>
        </div>
      </div>

      <div className="md:hidden mt-6 flex justify-between px-2 gap-2">
        <div>
          <button
            onClick={scrollToPerks}
            className="text-xs px-2 py-1 md:px-4 md:py-2 bg-yellow-400 text-slate-800  rounded-2xl hover:bg-yellow-300"
          >
            Claim your membership now
            <ArrowForwardIcon />
          </button>
        </div>
        <div>
          <button
            onClick={() => navigate("/art-community")}
            className="text-xs px-2 py-1 md:px-4 md:py-2 bg-yellow-400 text-slate-800 rounded-2xl hover:bg-yellow-300"
          >
            Become an Artist
            <ArrowForwardIcon />
          </button>
        </div>
      </div>

      <div className="w-4/5 ml-3 my-5 border-t border-slate-400"></div>

      <div className="mt-4 px-2 py-2">
        <div className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-2xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
          Your Event Ticket
        </div>
        <div className="mt-2 text-slate-500 text-xs md:text-xl  text-center font-poppins">
          Sorry you have not registered for an event via website.
        </div>
        <img
          src="/ticket.png"
          className="mt-4 blur-sm w-[80%] mx-auto"
          alt="image"
        />
      </div>

      <div className="w-4/5 ml-3 my-5 border-t border-slate-400"></div>

      <div className="mt-4 px-2 py-2">
        <div className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-2xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
          Claim your Certificate
        </div>

        <div className="mt-4 flex justify-between items-center gap-4">
          <div className="relative w-1/2">
            {/* Blurred Image */}
            <img
              src="/certificatetemplate.png"
              alt="template"
              className="w-full h-auto rounded-md blur-sm"
            />
            {/* Overlay Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="px-2 py-1 bg-slate-800 text-slate-200 rounded-xl text-sm cursor-not-allowed"
                disabled
              >
                Download <FileDownloadIcon />
              </button>
            </div>
          </div>

          <div className="w-1/2 text-slate-600 font-roboto">
            Sorry, you have not registered for an event through the website.
          </div>
        </div>
      </div>

      <div className="w-4/5 ml-3 my-5 border-t border-slate-400"></div>

      <div className="mt-4 px-2 py-2">
        <div
          ref={perks}
          className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-2xl font-medium tracking-tight text-transparent md:text-7xl font-poppins"
        >
          Membership Perks
        </div>

        <div className="mt-4 px-4 py-1 bg-gray-900 rounded-lg">
          <ul className="mt-6 space-y-4 text-sm text-slate-400 font-poppins">
            <li>
              <span className="font-medium text-white">
                Lifetime Membership
              </span>{" "}
              – No renewals, valid forever!
            </li>
            <li>
              <span className="font-medium text-white">Free Event Access</span>{" "}
              – Participate in events without extra registration costs.
            </li>
            <li>
              <span className="font-medium text-white">Auto Fee Deduction</span>{" "}
              – Event/workshop fees are automatically discounted when registered
              via the website.
            </li>
            <li>
              <span className="font-medium text-white">Join the Club</span> –
              First step to being recognized as a club member.
            </li>
            <li>
              <span className="font-medium text-white">All for ₹150</span> –
              One-time fee for lifelong benefits!
            </li>
          </ul>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="my-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-1 px-2 rounded-full shadow-lg text-sm font-poppins transition duration-300 hover:opacity-90 hover:shadow-2xl"
          >
            Become a Member
            <ArrowForwardIcon />
          </motion.button>
        </div>
      </div>

      <div className="w-4/5 ml-3 my-5 border-t border-slate-400"></div>

      <div className="mt-4 px-2 py-2">
        <div className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-2xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
          Features in Next Version(1.1.0)
        </div>
        <div className="mt-2 flex flex-col gap-4 font-poppins text-sm">
          <div className="bg-slate-200 px-4 py-2 rounded-2xl">
            <div className="text-slate-700 font-medium text-base">
              Website Access for all
            </div>
            <div className="text-slate-600 text-xs">
              The website will now be open to everyone, making it accessible to
              a broader audience.
            </div>
          </div>

          <div className="bg-slate-200 px-4 py-2 rounded-2xl">
            <div className="text-slate-700 font-medium text-base">
               Online Membership Registration 
            </div>
            <div className="text-slate-600 text-xs">
              Users can seamlessly register for membership directly through the
              website, ensuring a smooth and hassle-free process.
            </div>
          </div>
        </div>
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
          <Membershiptrial />
        </div>
      </Backdrop>
    </div>
  );
}
