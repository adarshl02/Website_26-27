import React from "react";

export function ThreeDCardDemo() {
  return (
    <div className="mt-20 m-8">
      <h1 className="text-center text-6xl font-poppins font-bold">Streetscape</h1>
      <div className="flex justify-center mt-8 ">
        <iframe
          width="800"
          className="rounded-3xl"
          height="400"
          src="https://www.youtube.com/embed/ucem4JGCIk0?si=uirmq2CsE-67Byku"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
