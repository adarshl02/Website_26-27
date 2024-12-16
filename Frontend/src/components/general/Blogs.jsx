import React, { useState } from 'react';
import Heart from "react-animated-heart";

export default function Blogs() {
  const [likes, setLikes] = useState(5);
  const [isClick, setClick] = useState(false);

  const handleHeartClick = () => {
    setClick(!isClick);
    setLikes((prevLikes) => (isClick ? prevLikes - 1 : prevLikes + 1));
  };

  return (
    <div className='p-4 md:p-6 flex flex-col justify-center items-center mt-20'>
      <div className="mb-4 bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
        Weekly Blog Page 
      </div>
      <div className="text-slate-500 text-base md:text-xl opacity-70 text-center">
        Pratibimb will post weekly blogs from the Registered Art Community.
      </div>

      <div className="w-full max-w-6xl flex flex-wrap bg-white shadow-lg rounded-lg p-4 md:p-6 mt-4 md:mt-8">
        {/* Image Section */}
        <div className='w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0'>
          <img src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195277/lyxz1fidjtbknrbsqqve.jpg" alt="Blog image" className="w-full h-auto rounded-md" style={{ maxHeight: '400px', objectFit: 'cover' }} />
        </div>

        {/* Content Section */}
        <div className='w-full md:w-1/2 flex flex-col justify-between px-1 md:px-6 py-2'>
          <div className="text-sm text-gray-500 mb-2">
            <span className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent font-poppins">Art and Culture</span>
            <span className="block font-bold mt-2">Date Posted: December 14, 2024</span>
            <span className="block font-bold">Credited by: John Doe (<a href="https://instagram.com/johndoe" className="text-blue-500 hover:underline" target="_blank">@johndoe</a>)</span>
          </div>

          <div className="text-gray-700 text-base leading-6">
            The vibrant and intricate design of the skull in this blog is an excellent example of calavera art, commonly referred to as "sugar skull art." Originating from Mexico, it is closely associated with Día de los Muertos (Day of the Dead), a traditional celebration honoring deceased loved ones.
            <br /><br />
            <span className='hidden md:block' >
            This piece showcases folk art techniques with vivid, hand-painted details. Its symmetrical patterns, floral designs, and vibrant colors reflect the cultural significance of celebrating both life and death.
            </span>
          </div>

          <div className="md:mt-4 flex items-center">
            <Heart isClick={isClick} onClick={handleHeartClick} />
            <span className="text-gray-600 text-sm ml-2">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}