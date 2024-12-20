import { Avatar } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { MeteorsPremium } from "../accertinityui/Meteor";

const SocialHandles = ({ target, avatarSrc }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let current = 0;
      const increment = target / 50; // Adjust speed here
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setCount(Math.floor(current));
      }, 40); // Adjust interval here
    }
  }, [isVisible, target]);

  return (
    <>
      {avatarSrc === "" ? (
        <div className="relative w-full mx-[20%] md:mx-[35%]">
          {/* Background Blur and Gradient */}
          {/* Main Content Container */}
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-yellow-600 to-yellow-900 transform scale-[0.85] rounded-full blur-3xl" />

          <div
            ref={elementRef}
            className="relative shadow-lg bg-gradient-to-r from-yellow-600 via-yellow-600 to-yellow-800  px-6 py-1 md:py-2 rounded-full flex items-center justify-between text-slate-100 overflow-hidden"
            style={{ willChange: "contents" }}
          >
            {/* Left Text */}
            <div className="text-slate-100 text-left text-2xl md:text-4xl font-medium font-poppins tracking-tight">
              Website <span className="inline-block" >Users</span> 
            </div>

            {/* Animated Count */}
            <span className="bg-gradient-to-br from-slate-100 to-slate-400 bg-clip-text text-5xl md:text-7xl font-medium tracking-tight text-transparent">
              {count}
            </span>

            {/* Meteors Animation */}
            <div className="absolute inset-0 overflow-hidden">
              <MeteorsPremium number={20} />
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={elementRef}
          className="w-[40%] sm:w-[30%] md:w-[20%] lg:w-[15%] bg-slate-950 rounded-full text-slate-200 flex items-center justify-between py-2 px-2"
          style={{ willChange: "contents" }}
        >
          {/* Avatar on the left */}
          <div className="flex-shrink-0">
            <Avatar src={avatarSrc} />
          </div>

          {/* Count on the right */}
          <span className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-transparent mr-4">
            {count}
          </span>
        </div>
      )}
    </>
  );
};

export default SocialHandles;
