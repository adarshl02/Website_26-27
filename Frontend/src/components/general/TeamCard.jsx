import React, { useState } from "react";

export function TeamCard({ name, post, image }) {
  const [isLoading, setIsLoading] = useState(true); // State to track image loading

  return (
    <div className="relative w-56 max-w-xs rounded-lg overflow-hidden">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className={`w-full h-64 object-cover transition-transform duration-300 transform hover:scale-110 ${
          isLoading ? "blur-3xl" : "blur-0"
        }`} // Blur the image while it's loading
        onLoad={() => setIsLoading(false)} // Set isLoading to false when image loads
      />

      {/* Black Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black opacity-40 z-10 blur-md"></div>
      )}

    </div>
  );
}
