import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";

import { getAuth, signOut } from "firebase/auth";

import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../../redux/user/userSlice.js";
import { logoutUser } from "../../service/api.js";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { deleteEvents } from "../../redux/events/eventsSlice.js";
import { toast } from "sonner";

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: (
      <img
        src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951309/gyfghcjtv8bivrzww0rb.png"
        alt="Home Icon"
        style={{ width: "32px", height: "32px" }}
      />
    ),
  },
  { name: "Team", path: "/team", icon: (
    <img
      src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951309/apfbrylovmp4xmtbxyhb.png"
      alt="team Icon"
      style={{ width: "32px", height: "32px" }}
    />
  ), },
  {
    name: "Archive",
    path: "/events",
    icon: (
      <img
        src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951308/exfsltqcjw6wckxxszia.png"
        alt="Notebook Icon"
        style={{ width: "32px", height: "32px" }}
      />
    ),
  },
  {
    name: "Art Community",
    path: "/art-community",
    icon: (
      <img
        src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951308/ids1wdjgumtjhvyenwgc.png"
        alt="Art Community Icon"
        style={{ width: "32px", height: "32px" }}
      />
    ),
  },
  {
    name: "Blogs",
    path: "/blogs",
    icon: (
      <Badge color="primary" variant="dot">
        <img
          src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951308/y9rtv5ukygh2rbhbfbpo.png"
          alt="Blog Icon"
          style={{ width: "32px", height: "32px" }}
        />
      </Badge>
    ),
  },
];

export function NavbarDemo({ scrollToCarousel }) {
  return (
    <div className="relative w-full flex justify-center">
      <Navbar className="top-2" scrollToCarousel={scrollToCarousel} />
    </div>
  );
}

function Navbar({ className, scrollToCarousel }) {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [navbarWidth, setNavbarWidth] = useState("60%"); // Initially set width to 60%
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const location = useLocation();

  // Increase width on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavbarWidth("100%"); // Animate to full width
    }, 1000); // Delay for animation start

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      // Start sign out process
      dispatch(signOutStart());
      dispatch(deleteEvents())
      // Call the logout API function
      const response = await logoutUser();

      // Check if the API call was successful
      if (!response.success){
        dispatch(signOutFailure(response.message));
        toast.error(response.message);
        return;
      }

      // Sign out from Firebase authentication
      await signOut(auth);

      toast.success("You're Signed Out!");
      dispatch(signOutSuccess());
      navigate("/sign-up");
    } catch (error) {
      // Handle any errors during the sign out process
      dispatch(signOutFailure(error.message));
      toast.error("Logout error: " + error.message);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
        {currentUser.rest.avatar && (
          <Avatar
            src={currentUser.rest.avatar}
            alt={currentUser.rest.name}
            sx={{ width: 48, height: 48, margin: "auto" }}
          />
        )}
        <div className="text-black mt-2">{currentUser.rest.name}</div>
        <div className="text-gray-600 text-sm mb-4">{currentUser.rest.email}</div>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/profile")}>
              <ListItemIcon>
              <img
        src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951308/tzrt5vney9zrzjrnkmri.png"
        alt="Profile Icon"
        style={{ width: "32px", height: "32px" }}
      />
              </ListItemIcon>
              <ListItemText primary="Your profile" />
            </ListItemButton>
          </ListItem>
          {isMobile && (
            <List>
              {navItems.map((item, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemButton
                    onClick={(e) => {
                      navigate(item.path);
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
                backgroundColor: "#E97450",
                borderRadius: "0.5rem",
              }}
            >
              <ListItemIcon sx={{ color: "#f0f0f0" }}>
                <ExitToAppIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Log out" sx={{ color: "#f0f0f0" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <div
      className={` ${isMobile?"hidden":"block"} flex items-center justify-between fixed top-3  md:max-w-5xl mx-auto space-x-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-slate-100 px-4 py-1 rounded-full shadow-lg z-50`}
      style={{
        width: navbarWidth, // Control the width via state
        transition: "width 0.5s ease-in-out", // Add smooth transition
      }}
    >
      <img
        src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195806/zegnantp5rqlmcia9co6.png"
        alt="Pratibimb Logo"
        className="h-10 w-auto"
        onClick={scrollToCarousel}
      />
      {!isMobile && (
        <div className="hidden sm:flex space-x-6">
          {navItems.map((item, idx) => (
            <Link
              to={item.path}
              key={idx}
              className="relative text-white cursor-pointer font-bold"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
      <div>
        <Tooltip title="Account settings">
          <IconButton
            onClick={(e) => {
              if (isMobile) {
                toggleDrawer(true)(); // Open the drawer in mobile view
              } else {
                handleMenuOpen(e); // Open the dropdown menu in larger screens
              }
            }}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? "true" : undefined}
          >
            <Avatar src={currentUser.rest.avatar}></Avatar>
          </IconButton>
        </Tooltip>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            borderRadius: "8px",
            padding: "2px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => navigate("/profile")}
          sx={{
            color: "gray",
            borderRadius: "8px",
            padding: "8px 16px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.08)",
            },
          }}
        >
          Your Profile&nbsp;&nbsp;
          <AccountCircleIcon />
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "rgb(255, 77, 77)",
            borderRadius: "8px",
            padding: "8px 16px",
            "&:hover": {
              backgroundColor: "rgba(255, 77, 77, 0.1)",
            },
          }}
        >
          Signout&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Logout />
        </MenuItem>
      </Menu>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
