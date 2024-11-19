import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { signOutFailure, signOutStart, signOutSuccess } from "../../redux/user/userSlice.js";

const navItems = [
  { name: "Team", path: "/team", icon: <PeopleIcon /> },
  { name: "Sponsors", path: "/sponsors", icon: <MonetizationOnIcon /> },
  { name: "Events", path: "/events", icon: <EventIcon /> },
  { name: "About Us", path: "/contact-us", icon: <InfoIcon /> },
  { name: "Trending", path: "/#latest", icon: <TrendingUpIcon /> },
  { name: "Feedback", path: "/#latest", icon: <FeedbackIcon /> },
];

export function NavbarDemo({ scrollToLatest, scrollToFeedback }) {
  return (
    <div className="relative w-full flex justify-center">
      <Navbar className="top-2" scrollToLatest={scrollToLatest} scrollToFeedback={scrollToFeedback} />
    </div>
  );
}

function Navbar({ className, scrollToLatest, scrollToFeedback }) {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    dispatch(signOutStart());
    const res = await fetch("/api/auth/signout");
    const data = await res.json();

    if (res.status!==200) {
      dispatch(signOutFailure(data.message));
      return;
    }
    signOut(auth)
      .then(() => {
        toast.success("You're Signed Out!");
        dispatch(signOutSuccess());
        navigate("/sign-up");
      })
      .catch((error) => {
        dispatch(signOutFailure(error.message));
      });
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        bgcolor: "#f0f4f8",
        color: "#333",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box sx={{ padding: "16px", textAlign: "center" }}>
        {currentUser.avatar && (
          <Avatar src={currentUser.avatar} alt={currentUser.name} sx={{ width: 48, height: 48, margin: "auto" }} />
        )}
        <div className="text-black mt-2">{currentUser.name}</div>
        <div className="text-gray-600 text-sm mb-4">{currentUser.email}</div>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/profile")} className="hover:bg-blue-600 rounded-lg">
              <ListItemIcon >
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Your profile" />
            </ListItemButton>
          </ListItem>
            {/* Navigation Links - Mobile Only */}
          {isMobile && (
          <List>
            {navItems.map((item, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemButton
                  onClick={(e) => {
                    if (item.name === "Trending") {
                      e.preventDefault();
                      scrollToLatest();
                    } else if (item.name === "Feedback") {
                      e.preventDefault();
                      scrollToFeedback();
                    } else {
                      navigate(item.path);
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                backgroundColor: "#E97451",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                "&:hover": { backgroundColor: "#F88379" },
              }}
            >
              <ListItemIcon sx={{ color: "#333" }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </ListItem>
        </List>
      
       
      </Box>
    </Box>
  );

  return (
    <div className="flex items-center justify-between fixed top-3 left-3 right-3 max-w-4xl mx-auto space-x-5 bg-slate-600 text-slate-100 px-6 py-3 rounded-full shadow-lg z-50">
      <Link to="/">
        <img src="./PratibimbLogo2.png" alt="Pratibimb Logo" className="h-10 w-auto" />
      </Link>
      {!isMobile && (
        <div className="hidden sm:flex space-x-6">
          {navItems.map((item, idx) => (
            <Link
              to={item.path}
              key={idx}
              className="relative text-white cursor-pointer font-bold"
              onClick={(e) => {
                if (item.name === "Trending") {
                  e.preventDefault();
                  scrollToLatest();
                } else if (item.name === "Feedback") {
                  e.preventDefault();
                  scrollToFeedback();
                }
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
      <Avatar
        src={currentUser.avatar}
        alt={currentUser.name}
        className="rounded-full h-10 w-10 object-cover cursor-pointer border-gray-300"
        onClick={toggleDrawer(true)}
      />
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
