import React from 'react';

const LatestOfPratibimb = () => {
  return (
    <div className="bg-slate-700 rounded-md  p-8 flex justify-center">
      {/* Main Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-white">

        <div className='flex flex-col ' >
            <span className='text-3xl md:text-5xl' >Latest of </span>
            <span className='text-4xl md:text-6xl mb-6' >Pratibimb</span>
            <div className='text-sm' > Explore the latest adventure in art, culture, and creativity. From vibrant exhibitions to inspiring showcases, 
    Pratibimb continues to be a beacon of innovation. Dive into the world of artistic reflections and witness 
    the merging of tradition with modern aesthetics.</div>
            
        </div>

        {/* Card 1 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            alt="Mystic Mode"
            className="w-40 h-40 object-cover rounded-md mb-4"
          />
          <div className="text-xl font-bold mb-2">Calling Volunteers from <br/> Batch 2028</div>
          <div className="text-gray-400 text-sm">Be a part of biggest Art event. Tentative Date : Dec,2024 </div>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            alt="Customise Settings"
            className="w-40 h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Conducted Sepia <br/>"A Whirl of Visuals"</h3>
          <p className="text-gray-400 text-sm">Tweak various elements of your images like color and lighting to make them stand out.</p>
        </div>
      </div>
    </div>
  );
};

export default LatestOfPratibimb;
