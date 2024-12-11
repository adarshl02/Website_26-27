import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../../accertinityui/lamp";
import { CardContainer } from "../../accertinityui/3d-card";
import { ContainerScroll } from "../../accertinityui/container-scroll-animaton";

export default function RecordEvents() {
  return (
    <div className="bg-slate-950 mx-4 rounded-3xl">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-7xl font-medium tracking-tight text-transparent md:text-9xl"
        >
          Streetscape
        </motion.h1>
      </LampContainer>

      <div className="mt-0 flex justify-between space-x-4">
        {/* Description Div */}
        <div className="w-1/2 p-4">
          <p className="text-lg text-slate-300 m-10 font-medium leading-relaxed font-poppins">
            Streetscape: The Tint Avenue was a grand 30-hour road painting event
            that brought together around 800 enthusiastic participants, who
            competed to create stunning artworks on the Library Road, SGSITS,
            from February 3 to 4, 2024. The event, organized by Club Pratibimb,
            not only celebrated creativity but also secured a place in the
            prestigious Official Book of Records in London. Participants,
            inspired by various themes, showcased their artistic skills,
            transforming the road into a vibrant, colorful masterpiece. With its
            jubilant atmosphere and record-breaking achievement, Streetscape was
            a truly unforgettable celebration of art and community spirit.
          </p>
        </div>

        {/* Poster Div */}
        <div className="w-1/2">
          <CardContainer className="inter-var z-10">
            <img
              src="https://res.cloudinary.com/dhy548whh/image/upload/v1733767739/o4r5q4deccmkurcubktm.jpg"
              alt="Event Poster"
              className="w-96 h-auto object-cover"
            />
          </CardContainer>
        </div>
      </div>

      <div className="flex flex-col justify-center overflow-hidden">
        <ContainerScroll
          titleComponent={
            <span className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-7xl font-medium tracking-tight text-transparent md:text-9xl">
              After Movie
            </span>
          }
        >
          <iframe
            width="1000"
            className="rounded-3xl"
            height="400"
            src="https://www.youtube.com/embed/ucem4JGCIk0?si=uirmq2CsE-67Byku"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </ContainerScroll>
      </div>
    </div>
  );
}
