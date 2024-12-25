import { Skeleton, Stack } from "@mui/material";
import React, { useState } from "react";

export function TeamCard({ name, image }) {
  const [isLoading, setIsLoading] = useState(true); // State to track image loading

  return (
    <div className="relative w-40 md:w-56 max-w-xs rounded-lg overflow-hidden">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className={`w-full h-48 md:h-64 object-cover transition-transform duration-300 transform scale-110 hover:scale-100 ${isLoading ? "blur-3xl" : "blur-0"}`} 
        onLoad={() => setIsLoading(false)} // Set isLoading to false when image loads
        onError={() => setIsLoading(false)} // Handle image loading error
      />

      {/* Loading Effect */}
      {isLoading && (
        <div className="absolute inset-0 flex">
          <Stack>
           
            <Skeleton variant="rounded" width={224} height={250} />
            <Skeleton variant="text" sx={{ fontSize: '2.5rem', width: '100%' }} />
          </Stack>
        </div>
      )}

      {/* Content - this can be shown when the image has loaded */}
      {!isLoading && (
        <div className="absolute bottom-0 left-0 p-1 text-white bg-black bg-opacity-50">
          <h3 className="text-lg">{name}</h3>
        </div>
      )}
    </div>
  );
}
