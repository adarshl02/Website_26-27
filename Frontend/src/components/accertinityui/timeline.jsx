"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Meteors } from "./Meteor";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="font-sans" ref={containerRef}>
      <div className="relative text-center pt-4">
        <div className="mt-4 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-4xl font-medium tracking-tight text-transparent md:text-8xl">
          Overnight Series
        </div>
        <Meteors number={30} className="custom-meteor-class" />
        <p className="text-neutral-300 text-sm md:text-lg opacity-70">
          A range of Overnight Record breaking Events.
        </p>
      </div>
      {/* <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Changelog from my journey
        </h2>
        
      </div> */}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
                &nbsp; &nbsp;
              </h3>
              <span className="hidden md:block">
                {item.title === "2016" && (
                  <img className="h-32" src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195277/h9hbnlhhkgcjd82am6id.png" alt="image" />
                )}
                {item.title === "2012" && (
                  <img className="h-32 " src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195277/ud2xrkuxmdzdjszojh2y.png" alt="image" />
                )}
                {item.title === "2024" && (
                  <img className="h-32" src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195278/kklso8t7ahnzrhrjitlm.png" alt="image" />
                )}
              </span>
            </div>

            <div className="relative pl-20 pr-2 md:pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
                {item.title === "2016" && (
                  <img className="h-28" src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195277/h9hbnlhhkgcjd82am6id.png" alt="image" />
                )}
                {item.title === "2012" && (
                  <img className="h-32" src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195277/ud2xrkuxmdzdjszojh2y.png" alt="image" />
                )}
                {item.title === "2024" && (
                  <img className="h-32" src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195278/kklso8t7ahnzrhrjitlm.png" alt="image" />
                )}
              </h3>
              <div className="">{item.content} </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
