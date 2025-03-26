import React, { useEffect, useRef, useState } from "react";
import { PlaceholdersAndVanishInputDemo } from "../components/general/PlaceholdersAndVanishInputDemo";
import { CoolMode } from "../components/magicui/cool-mode";
import AnimationIcon from "@mui/icons-material/Animation";
import { Button } from "@mui/material";
import { AnimatedTooltip } from "../components/accertinityui/animated-tooltip";
import { motion } from "framer-motion";
import { ImagesSlider } from "./../components/accertinityui/image-slider";
import LatestOfPratibimb from "../components/general/LatestOfPratibimb";

import { Backdrop } from "@mui/material";
import VolunteerForm from "../components/general/VolunteerForm";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VolunteerFormClosed from "../components/general/VolunteerFormClosed";
import { useDispatch, useSelector } from "react-redux";
import UpcomingEventNotReleased from "./../components/general/UpcomingEventNotReleased";
import ModernCarousel from "../components/general/ModernCarousel";
import SocialHandles from "../components/general/SocialHandles";
import { countUsers } from "../service/api";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

const people = [
  {
    id: 3,
    name: "Vibhuti Baldva",
    designation: "UI Designer",
    image:
      "https://res.cloudinary.com/dhy548whh/image/upload/v1739046848/vibhuti_xnur6n.jpg",
  },

  {
    id: 1,
    name: "Adarsh Landge",
    designation: "Web Head",
    image:
      "https://res.cloudinary.com/dhy548whh/image/upload/v1734528470/ItsMe2_2_t3tvmi.png",
  },
  {
    id: 2,
    name: "Eklavya Parihar",
    designation: "Backend Coordinator",
    image:
      "https://res.cloudinary.com/dhy548whh/image/upload/v1734528551/IMG-20241217-WA0022_2_e867zl.jpg",
  },

  {
    id: 4,
    name: "Arpita Jain",
    designation: "Content Writer",
    image:
      "https://res.cloudinary.com/dhy548whh/image/upload/v1734528510/IMG-20241217-WA0003_2_k0wdnf.jpg",
  },
];

const images = [
  "graffathonvideo.mp4",
  "https://res.cloudinary.com/dhy548whh/image/upload/v1742982956/bhjdmfg9qkwnkfwiyuxs.png",
  "https://res.cloudinary.com/dhy548whh/image/upload/v1742983685/rlzog1rtfnknegppuick.png",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783423/rjcrohc5kjered7k9e0u.heic?http2=false",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783443/wx9b0fqtjbrefbutytk2.jpg",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783451/muc91zcge8ieu73wcv92.heic?http2=false",
  "https://res.cloudinary.com/dhy548whh/image/upload/v1734373029/zsrhicrmpwbnifvn1coe.jpg",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783471/key2lzept0d4lfauqj85.jpg",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783477/ibkqx7avojzcgptnpd5h.jpg",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783494/g10d8iewbzhjxitzx6qa.jpg",
  "https://res.cloudinary.com/dhy548whh/image/upload/f_auto,q_auto/v1729783496/nd5lefydm7boxosreni0.jpg",
];


export default function Home({ carouselRef, latestRef, scrollToLatest }) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [websiteUserTarget, setWebsiteUserTarget] = useState(0);
  const { token } = useSelector((state) => state.user.currentUser);

  useEffect(() => {

    const fetchUserCount = async () => {
      if (!token) {
        console.error("No token found. Please authenticate.");
        return;
      }
      const response = await countUsers(token);
      
      if (response.success) {
        setWebsiteUserTarget(response.data);

      } else {
        toast.error(response?.message);
        console.error("Failed to fetch user count:", response.error);
      }
    };
    fetchUserCount();
  }, []);


  const socialHandles = [
    {
      target: websiteUserTarget,
      avatarSrc: "",
    },
    {
      target: 3551,
      avatarSrc:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1733923563/tpuqqhg73ccx2cbs6ccq.png",
    },
    { target: 3167, avatarSrc: "https://res.cloudinary.com/dhy548whh/image/upload/v1739046840/facebook_gndrmo.png" },
    { target: 537, avatarSrc: "https://res.cloudinary.com/dhy548whh/image/upload/v1739046840/linkedin_pvjomm.png" },
    {
      target: 113,
      avatarSrc:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1733923562/ph251e5rkfoteorw38ug.png",
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div ref={carouselRef} className="bg-slate-900">
        <ImagesSlider className="min-h-screen" images={images}>
          <motion.div
            initial={{
              opacity: 0,
              y: -50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="z-50 flex flex-col "
          >
            <motion.p className="font-bold text-4xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 py-4">
              Pratibimb <br /> The Reflection of Art
            </motion.p>
            <button
              className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4"
              onClick={scrollToLatest}
            >
              <span>
                Featuring <ArrowForwardIcon />
              </span>
              <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
            </button>
          </motion.div>
        </ImagesSlider>
      </div>
      <div
        ref={latestRef}
        className="font-bold text-7xl m-5 md:m-10 bg-gradient-to-r from-blue-400 to-purple-950 bg-clip-text text-transparent"
      >
        <LatestOfPratibimb handleOpen={handleOpen} handleOpen2={handleOpen2} />
      </div>

      <div className="mt-16 md:mt-28 ml-4 md:ml-16 bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-4xl font-medium tracking-tight text-transparent md:text-7xl font-poppins text-left">
        About Us
      </div>

      <div className="relative flex justify-end">
        <div className="relative md:max-w-[50%] max-w-[60%] flex justify-end">
          <img
            src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951075/dve1te6jjd5pjyohkmba.png" // Path to your image
            alt="About Us"
            className="w-full max-w-md md:max-w-2xl object-cover rounded-lg"
          />
        </div>

        {/* Overlayed Text */}
        <div
          className="shadow-xl absolute top-5 md:top-16 left-0 right-1/2 md:right-[600px] bottom-5 md:bottom-16 rounded-r-full flex items-center justify-center text-center p-4 md:p-12"
          style={{
            background:
              "linear-gradient(to right, rgba(200, 194, 186, 0.7), rgba(224, 188, 140, 0.8))",
          }}
        >
          <div className="text-left md:m-6 bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text text-xs font-medium tracking-tight text-transparent md:text-2xl font-poppins">
            <span className="hidden md:block">
              Club Pratibimb is a realm where imagination reigns, where every
              stroke, shot, and splash becomes a force for change.
            </span>{" "}
            Club was founded on the momentous occasion of World Photography Day,
            19 August 2011, our journey is a celebration of vision, artistry,
            and evolution.
          </div>
        </div>
      </div>

      <div className="relative flex justify-start">
        <div className="relative md:max-w-[50%] max-w-[60%] flex justify-start">
          <img
            src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951074/dybsi3dmognev7xysqrl.png" // Path to your image
            alt="About Us"
            className="w-full max-w-md md:max-w-2xl object-cover rounded-lg"
          />
        </div>
        {/* Overlayed Text */}
        <div
          className="shadow-xl absolute top-5 md:top-16 right-0 left-1/2 md:left-[600px] bottom-5 md:bottom-16 rounded-l-full flex items-center justify-center text-center  p-4 md:p-12"
          style={{
            background:
              "linear-gradient(to right, rgba(224, 188, 140, 0.8),rgba(200, 194, 186, 0.7))",
          }}
        >
          <div className="text-right md:m-6 bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text text-xs font-medium tracking-tight text-transparent md:text-2xl font-poppins">
            Fueled by passion and crowned by legacy, Pratibimb transforms art
            from mere visuals into movements that endure beyond time.{" "}
            <span className="hidden md:block">
              {" "}
              We don't just create, we leave behind imprints of transformation,
              shaping a future where every vision evolves into a lasting legacy.
            </span>
          </div>
        </div>
      </div>

      <div className="text-center mt-16 md:mt-28 md:mb-3 bg-gradient-to-br from-slate-500 to-slate-900 bg-clip-text text-4xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
        Our Network
        <div className="flex flex-wrap justify-center items-center mt-4  md:mt-12  gap-4 sm:gap-6 md:gap-12">
          {socialHandles.map((handle, index) => (
            <SocialHandles
              key={index}
              target={handle.target}
              avatarSrc={handle.avatarSrc}
            />
          ))}

          {/* Website Users Component */}
        </div>
      </div>

      <ModernCarousel />

      <PlaceholdersAndVanishInputDemo />

      <div className="mt-16 font-bold text-xl md:text-4xl text-center mb-2">
        Made with{" "}
        <FavoriteIcon
          style={{
            fontSize: "32px", // Smaller size for mobile
          }}
          className="text-red-900 md:!text-[48px]"
        />{" "}
      </div>

      <div className="flex flex-row items-center justify-center mb-5 w-full">
        <AnimatedTooltip items={people} />
      </div>
      <div className="mt-2  text-sm mx-12 md:text-base text-slate-500 text-center">
        Crafted with love and some coffee and constantly improved by @teampratibimb

      </div>
      <div className="fixed bottom-4 right-4 hidden md:block">
        <CoolMode>
          <Button>
            Spread Art
            <AnimationIcon />
          </Button>
        </CoolMode>
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
          {/* <VolunteerForm setOpen={setOpen} /> */}
          <VolunteerFormClosed />
        </div>
      </Backdrop>

      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={open2}
        onClick={handleClose2}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <UpcomingEventNotReleased />
        </div>
      </Backdrop>
    </div>
  );
}
