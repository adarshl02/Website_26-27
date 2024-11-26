import { Skeleton, Stack } from "@mui/material";
import React, { useState } from "react";

export  function SponsorImageCard({image}) {
    const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative w-40 md:w-56 max-w-xs rounded-lg overflow-hidden">
      {/* Image */}
      <img
        src={image}
        alt="Load error"
        className={`w-full h-48 md:h-64 object-fit transition-transform duration-300 transform hover:scale-110 ${isLoading ? "blur-3xl" : "blur-0"}`} 
        onLoad={() => setIsLoading(false)} 
        onError={() => setIsLoading(false)} 
      />

      {/* Loading Effect */}
      {isLoading && (
        <div className="absolute inset-0 flex">
          <Stack>
            <Skeleton variant="rounded" width={224} height={250} />
          </Stack>
        </div>
      )}
       </div>
  )
}
