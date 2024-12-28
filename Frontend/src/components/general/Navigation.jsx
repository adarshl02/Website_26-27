import React, { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  {
    name: "Team",
    path: "/team",
    icon: (
      <img
        src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951309/apfbrylovmp4xmtbxyhb.png"
        alt="Team Icon"
        style={{ width: "28px", height: "28px" }}
      />
    ),
    dis: "translate-x-0"
  },
  {
    name: "Archive",
    path: "/events",
    icon: (
      <img
        src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951308/exfsltqcjw6wckxxszia.png"
        alt="Team Icon"
        style={{ width: "28px", height: "28px" }}
      />
    ),
    dis: "translate-x-16"
  },
  {
    name: "Home",
    path: "/",
    icon: (
      <img
        src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951309/gyfghcjtv8bivrzww0rb.png"
        alt="Home Icon"
        style={{ width: "28px", height: "28px" }}
      />
    ),
    dis: "translate-x-32"
  },
  {
    name: "Blogs",
    path: "/blogs",
    icon: (
      <img
        src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951308/ids1wdjgumtjhvyenwgc.png"
        alt="Art Community Icon"
        style={{ width: "28px", height: "28px" }}
      />
    ),
    dis: "translate-x-48"
  },
  {
    name: "Profile",
    path: "/profile",
    icon: (
      <img
        src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951308/tzrt5vney9zrzjrnkmri.png"
        alt="Profile Icon"
        style={{ width: "28px", height: "28px" }}
      />
    ),
    dis: "translate-x-64"
  },
  
];

export default function Navigation() {
  const [active, setActive] = useState(2);

  return (
<div className="pb-2 md:hidden shadow-customdark fixed bottom-0 bg-white flex justify-center rounded-t-xl max-h-[3.6rem] w-full z-50">
    <ul className="flex relative">
      <span
          className={`bg-rose-600 duration-500 ${navItems[active].dis} h-16 w-16 absolute -top-5 rounded-full z-10`}
          style={{ border: "5px solid rgba(17, 24, 39, 0.75)" }}
        >
          <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] rounded-tr-[11px] shadow-myShadow1"></span>
          <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] rounded-tl-[11px] shadow-myShadow2"></span>
       
        </span>

        {navItems.map((item, i) => (
          <li key={i} className="w-16 z-20">
            <Link
              to={item.path}
              className="flex flex-col text-center pt-3"
              onClick={() => setActive(i)}
            >
              <span
                className={`flex justify-center text-slate-400 text-xl cursor-pointer duration-500 ${
                  i === active && "-mt-4 text-white"
                }`}
              >
                {item.icon}
              </span>
              {/* <span
                className={`${
                  active === i
                    ? "translate-y-4 duration-700 opacity-100 text-black font-sans font-medium text-sm"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {item.name}
              </span> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
