import React, { useState } from "react";
import { TextGenerateEffect } from "../../accertinityui/text-generate-effect";
import { Skeleton, Stack } from "@mui/material";

const EventCard = ({ event }) => {
  const [logoLoading, setLogoLoading] = useState(true);
  const [posterLoading, setPosterLoading] = useState(true);

  return (
    <div className="my-8">
      {/* Logo Section */}
      <div className="relative flex justify-center my-4">
        {/* Show Skeleton while the logo is loading */}
        {logoLoading && (
          <div className="absolute inset-0 flex justify-center">
            <Skeleton variant="rounded" width={192} height={48} />
          </div>
        )}
        <img
          src={event.logo}
          alt={`${event.title} logo`}
          className={`w-48 transition-transform duration-300 ${
            logoLoading ? "blur-3xl" : "blur-0"
          }`}
          onLoad={() => setLogoLoading(false)}
          onError={() => setLogoLoading(false)}
          loading="lazy"
        />
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="mx-4 md:mx-8">
          
          <div className="block md:hidden">
            <TextGenerateEffect words={event.shortDescription} />
          </div>
          
          <div className="hidden md:block">
            <TextGenerateEffect words={event.description} />
          </div>
        </div>
        <div className="relative flex justify-center">
          
          {posterLoading && (
            <div className="mt-18 absolute inset-0 flex justify-center">
              
              <Skeleton variant="rounded" width={300} height={384} />
              
            </div>
          )}
          <img
            src={event.poster}
            alt={`${event.title} poster`}
            className={`rounded-xl h-72 md:h-96 object-cover transition-transform duration-300 ${
              posterLoading ? "blur-3xl" : "blur-0"
            }`}
            onLoad={() => setPosterLoading(false)}
            onError={() => setPosterLoading(false)}
            loading="lazy"
          />
        </div>
      </div>

      {/* Video Section */}
      <div className="my-8 mx-4">
        <iframe
          className="w-full h-48 md:h-[500px] rounded-xl"
          src={event.video}
          title={`${event.title} video`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
     
    </div>
  );
};

export default EventCard;
