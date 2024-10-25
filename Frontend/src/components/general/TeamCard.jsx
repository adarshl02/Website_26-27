import React from "react";

export function TeamCard({ name, post, image }) {
  return (
    <div className="relative w-56 max-w-xs rounded-lg overflow-hidden">
      {/* Image */}
      <img
        src="ItsMe.jpg"
        alt={name}
        className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-110 z-10"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Footer: Name and Post */}
      <div className="absolute bottom-6 left-4 text-white z-20">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-300">{post}</p>
      </div>
    </div>
  );
}
