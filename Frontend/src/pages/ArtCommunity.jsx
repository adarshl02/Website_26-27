import React, { useEffect, useRef, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import ArtCommunityForm from "./../components/general/ArtCommunityForm";
import { motion } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MeteorsPremium } from "../components/accertinityui/Meteor";
import { countArtist, fetchartcommunity } from "../service/api";
import { useSelector } from "react-redux";
import { updateIsArtist } from "../redux/user/userSlice";
import { Helmet } from "react-helmet-async";

export default function ArtCommunityPage() {
  const [open, setOpen] = useState(false);
  const [Artistcount, setArtistCount] = useState(0);

  const { rest: user, token } = useSelector((state) => state.user.currentUser);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchArtistCount = async () => {
      if (!token) {
        console.error("No token found. Please authenticate.");
        return;
      }
      const response = await countArtist(token);
      if (response.success) {
        setArtistCount(response.data);
      } else {
        console.error("Failed to fetch user count:", response.error);
      }
    };
    const fetchCommunity = async () => {
      const response = await fetchartcommunity(token);
      if (response.success) {
        setMembers(response.data.data);
      } else {
        console.error("Failed to fetch user count:", response.error);
      }
    };

    fetchArtistCount();
    fetchCommunity();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="p-4 md:p-6 flex flex-col justify-center items-center mt-14">
      <Helmet>
        <title>Art Community</title>
        <meta name="description" content="Join PRATIBIMB's art community at SGSITS, Indore. Connect with fellow artists, share your passion for Fine Arts and Photography, and let your creativity shine." />
        <link rel="canonical" href="https://www.clubpratibimb.com/art-community" />
      </Helmet>
      <div className="py-1 rounded-2xl text-center bg-white md:bg-azure  fixed md:static top-0 w-full z-40">
        <div className=" py-2 md:mb-4 bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
          Art Community
        </div>
      </div>
      <div className="text-slate-500 text-sm md:text-xl opacity-70 text-center mb-2 font-poppins">
        Join a vibrant community of artists and let your creativity shine.
      </div>

      <div className="mb-2 relative w-[60%] md:w-[30%]">
        {/* Background Blur and Gradient */}
        {/* Main Content Container */}

        <div
          className="relative shadow-lg bg-gradient-to-r from-yellow-600 via-yellow-600 to-yellow-800  px-6 py-1 md:py-2 rounded-full flex items-center justify-between text-slate-100 overflow-hidden"
          style={{ willChange: "contents" }}
        >
          {/* Left Text */}
          <div className="text-slate-100 text-left text-xl md:text-3xl font-medium font-poppins tracking-tight">
            Registered Artist
          </div>

          {/* Animated Count */}
          <span className="bg-gradient-to-br from-slate-100 to-slate-400 bg-clip-text text-4xl md:text-6xl font-medium tracking-tight text-transparent">
            {Artistcount}
          </span>

          {/* Meteors Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <MeteorsPremium number={20} />
          </div>
        </div>
      </div>
      {/* Registration Section */}
      {!user.is_artist ? (
        <>
          <div className="p-6 rounded-lg shadow-lg mb-8 w-full max-w-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
            <h2 className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-2xl md:text-3xl font-semibold text-transparent font-poppins mb-4">
              Why Join?
            </h2>

            <ul className="list-disc list-inside text-slate-300 text-sm md:text-xl font-display opacity-70">
              <li>Get featured in our Weekly Blog Page.</li>
              <li>
                Receive exposure on our Instagram handle&nbsp; &nbsp;
                &nbsp;&nbsp;with 3500+ followers.
              </li>
              <li>Boost your visibility as an artist.</li>
              <li>Connect with a vibrant art community.</li>
            </ul>
          </div>
          <h2 className=" bg-gradient-to-br from-slate-600 to-slate-900 bg-clip-text text-2xl md:text-3xl font-semibold text-transparent font-poppins mb-2">
            To Join Art Community
          </h2>
          <div className="flex justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className=" bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 px-4 rounded-full shadow-lg font-bold transition duration-300 hover:opacity-90 hover:shadow-2xl"
            >
              Submit your artwork
            </motion.button>
          </div>
          <div className="text-center mt-2  text-slate-800 text-xs md:text-xl font-display opacity-70 mb-8">
            Our team will make you <b>Artist </b> based on your artwork. If
            selected, your art will be featured in our Weekly Blog Page and
            shared with thousands of art enthusiasts on Instagram!
            <p className="text-sx md:text-base text-red-600 mt-1">
              P.S : There should be sign on artwork with your name registered.
            </p>
          </div>
        </>
      ) : (
        <div className="text-center p-6 rounded-lg shadow-lg mb-8 w-full max-w-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
          <h2 className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-2xl md:text-3xl font-medium text-transparent font-poppins mb-4">
            Hey Artist, it’s time to embrace your art!
          </h2>
          <div className="text-slate-300 text-sm md:text-xl font-display opacity-70 mb-4">
            Now that you’ve joined, you can submit your artwork every 7 days. If
            selected, your art will be featured in our Weekly Blog Page and
            shared with thousands of art enthusiasts on Instagram!
            <p className="text-sx md:text-base text-red-400">
              P.S : There should be sign of you matching with your name
              registered.
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 px-4 rounded-full shadow-lg font-bold transition duration-300 hover:opacity-90 hover:shadow-2xl"
          >
            Submit your artwork
          </motion.button>
        </div>
      )}

      {/* Members Section */}

      <div className="w-full max-w-5xl ">
        <h2 className="bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text text-2xl md:text-4xl font-medium text-transparent font-poppins mb-6 text-center">
          Members of Art Community
        </h2>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#1E293B", // Equivalent to bg-slate-800
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#CBD5E1",
                    fontWeight: "bold",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Name
                </TableCell>

                <TableCell
                  sx={{
                    color: "#CBD5E1",
                    fontWeight: "bold",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Instagram
                </TableCell>
                <TableCell
                  sx={{
                    color: "#CBD5E1",
                    fontWeight: "bold",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Avatar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      color: "#E2E8F0",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {member.name}
                  </TableCell>

                  <TableCell
                    sx={{
                      color: "#E2E8F0",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {member.instagram_user_id}
                  </TableCell>
                  <TableCell>
                    <Avatar src={member.avatar} alt={member.name} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Backdrop Section */}
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={open}
        onClick={handleClose}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <ArtCommunityForm
            setOpen={setOpen}
            user={user}
            token={token}
            updateIsArtist={updateIsArtist}
          />
        </div>
      </Backdrop>
    </div>
  );
}
