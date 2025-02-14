import React, { useEffect, useState } from 'react';
import Heart from "react-animated-heart";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Blogs() {
  const [likes, setLikes] = useState(5);
  const [isClick, setClick] = useState(false);
  const navigate = useNavigate();

  const handleHeartClick = () => {
    setClick(!isClick);
    setLikes((prevLikes) => (isClick ? prevLikes - 1 : prevLikes + 1));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='py-4 md:p-6 flex flex-col justify-center items-center md:mt-16'>
      <Helmet>
        <title>Blogs | Pratibimb</title>
        <meta name="description" content="Read insightful blogs from PRATIBIMB at SGSITS, Indore. Explore stories, experiences, and creative journeys in art and photography." />
        <link rel="canonical" href="https://www.clubpratibimb.com/blogs" />
      </Helmet>

      <div className='py-1 rounded-2xl text-center bg-white md:bg-azure fixed md:static  top-0 w-full z-40' >
        <div className=" py-2 md:mb-4 bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
          Weekly Blog Page
        </div>
      </div>
      <div className='mt-12 md:mt-0' >
        <div className="text-slate-600 text-sm md:text-xl opacity-70 text-center font-poppins">
          Pratibimb will post weekly blogs about latest Arts & photography skills and post selected from art community.
        </div>

        <div className='my-2 flex flex-col justify-center items-center md:hidden'>
          <span className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-xl font-medium tracking-tight text-transparent font-poppins">Want your Art Display here</span>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/art-community")}
            className="my-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-sm py-2 px-4 rounded-full shadow-lg font-medium transition duration-300 hover:opacity-90 hover:shadow-2xl"
          >
            <span>
              Go to ArtCommunity Page
            </span>
          </motion.button>
        </div>

        <div className="w-full max-w-6xl flex flex-wrap bg-white shadow-lg rounded-2xl p-4 md:p-6 md:mt-8">
          {/* Image Section */}
          <div className='w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0'>
            <img src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195277/lyxz1fidjtbknrbsqqve.jpg" alt="Blog image" className="w-full h-auto rounded-md" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </div>

          {/* Content Section */}
          <div className='w-full md:w-1/2 flex flex-col justify-between px-1 md:px-6 py-2'>
            <div className="text-sm text-gray-500 mb-2">
              <span className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent font-poppins">Art and Culture</span>
              <span className="block font-bold mt-2">Date Posted: December 14, 2024</span>
              {/* <span className="block font-bold">Credited by: John Doe (<a href="https://instagram.com/johndoe" className="text-blue-500 hover:underline" target="_blank">@johndoe</a>)</span> */}
            </div>

            <div className="text-gray-700 text-base font-poppins">
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

        <div className="w-full max-w-6xl flex flex-wrap bg-white shadow-lg rounded-2xl p-4 md:p-6 md:mt-8 mt-4">
          {/* Image Section */}
          <div className='w-full md:w-1/2 flex justify-center items-start md:mt-20 mb-4 md:mb-0'>
            <img src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195277/lyxz1fidjtbknrbsqqve.jpg" alt="Blog image" className="w-full h-auto rounded-md" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </div>

          {/* Content Section */}
          <div className='w-full md:w-1/2 flex flex-col justify-between px-1 md:px-6 py-2 font-poppins'>
            <div className="text-sm text-gray-500 mb-2">
              <span className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent font-poppins">Jungles and Pots</span>
              {/* <span className="block font-bold mt-2">Date Posted: December 14, 2024</span> */}
              {/* <span className="block font-bold">Credited by: John Doe (<a href="https://instagram.com/johndoe" className="text-blue-500 hover:underline" target="_blank">@johndoe</a>)</span> */}
            </div>

            <div className="text-gray-700 text-base leading-6">
              Indian art—when we say this, the world sees images of women carrying pots and a few celestial paintings of the gods. Because surely, a country with such staggering diversity, countless cultures, and centuries of history couldn’t possibly have more than one art form. How could a land so vast and varied ever produce anything beyond that?
              <br /> <br />
              <span>
                Today, let's get introduced to two hidden and well-kept secret art forms of India that are definitely not pots and jungles. First, from the bustling hub of <b>Bihar</b>, we have the <b>Manjusha paintings</b>. Hailing from the ancient town of <b>Anga</b>, Manjusha art is a vibrant, lesser-known gem deeply tied to the folklore of the <b>Bishahari festival</b>, which honors the serpent deity and the goddess <b>Durga</b>. The name <b>"Manjusha" (meaning "box")</b> refers to the intricately painted cylindrical bamboo boxes used to carry ceremonial offerings during processions. This art is characterized by its angular, linear patterns, vibrant hues of <b>green, yellow, and red</b>, and narrative depictions of the goddess’s triumph over evil.
                <br /><br />
                Now, let’s pivot southwest to the arid landscapes of <b>Kutch, Gujarat</b>, where the centuries-old craft of <b>Roghan painting</b> defies stereotype. Roghan is a mesmerizing technique where <b>castor oil</b> is boiled into a thick paste, mixed with pigments, and painstakingly "drawn" onto fabric using a thin metal rod. Artists work backward, folding the cloth to imprint mirror-image patterns, creating symmetrical masterpieces of <b>flora, peacocks, and the iconic "Tree of Life."</b> Practiced exclusively by the <b>Khatri community</b> for generations, this art nearly vanished until recent revival efforts.
                <br /><br />
                India’s art forms are like its languages: <b>distinct, evolving, and rooted in local soil.</b>
              </span>
              <br /><br />
              <span>
                So there we begin a journey to <b>Indian art</b>, which is far more than a collection of familiar patterns. It’s a <b>vibrant, living testament</b> to the country’s rich cultural diversity and history—a <b>Pandora’s box</b> of unseen masterpieces and untold stories. Let's together bring them to light.
              </span>
            </div>


            <div className="md:mt-4 flex items-center">
              <Heart isClick={isClick} onClick={handleHeartClick} />
              <span className="text-gray-600 text-sm ml-2">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-6xl flex flex-wrap bg-white shadow-lg rounded-2xl p-4 md:p-6 md:mt-8 mt-4">
          {/* Image Section */}
          <div className='w-full md:w-1/2 flex justify-center items-start md:mt-20 mb-4 md:mb-0'>
            <img src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195277/lyxz1fidjtbknrbsqqve.jpg" alt="Blog image" className="w-full h-auto rounded-md" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </div>

          {/* Content Section */}
          <div className='w-full md:w-1/2 flex flex-col justify-between px-1 md:px-6 py-2 font-poppins'>
            <div className="text-sm text-gray-500 mb-2">
              <span className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent font-poppins">
                <b>A Different Starry Night</b>
              </span>
            </div>

            <div className="text-gray-700 text-base leading-6">
              Stepping into the world of art, every individual goes through one thing without a doubt, that is falling in love with <b>Vincent Van Gogh’s</b> famous <b>‘Starry Night.’</b> The majestic painting that captures your eyes and the essence of nature in one striking canvas. However, do you know that <b>Van Gogh’s brilliance</b> was not limited to just that one starry night? In his lifetime, he actually painted <b>2 different starry nights</b>, one of which is yet to be discovered by the masses.
              <br /> <br />
              <span>
                <b>“Starry Night Over the Rhone”</b> is a painting created in <b>1888</b> in the city of <b>Arles</b>. While the traditional starry night focused on the beauty and connection of nature with man, the second painting showed a stark contrast to his previous focus, heavily on <b>stars and reflections</b>. While the <b>moon</b> is luminous and captivating, it is transient, waning over time, much like the fleeting moments of perfection in life. In contrast, the <b>stars</b> remain steadfast, their light enduring no matter how the Earth shifts or turns. This contrast mirrors the human experience: the moon represents the <b>ephemeral nature of joy and beauty</b>, while the stars symbolize the relentless, unchanging nature of <b>hope and perseverance</b>. The stars, infinite and unchanging, become a metaphor for the endless struggle inherent in life. Yet, they also embody <b>hope—a constant, guiding light even in the darkest of times.</b>
              </span>
              <br /><br />
              <span>
                <b>Van Gogh's artistic brilliance</b> is a well-known fact; for a person who battled <b>mental illness</b> for a long time, the stars highlighted in his <b>second starry night</b> became the icon of <b>hope</b> for him, constantly twinkling but always out of reach. <b>“Starry Night Over the Rhône”</b> is a masterpiece that invites us to reflect that our brightest moments may fade, but like the stars, our <b>hope and resilience can remain eternal.</b>
              </span>
            </div>

            <div className="md:mt-4 flex items-center">
              <Heart isClick={isClick} onClick={handleHeartClick} />
              <span className="text-gray-600 text-sm ml-2">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </div>
          </div>
        </div>


        <div className="w-full max-w-6xl flex flex-wrap bg-white shadow-lg rounded-2xl p-4 md:p-6 md:mt-8 mt-4">
          {/* Image Section */}
          <div className='w-full md:w-1/2 flex justify-center items-start md:mt-20 mb-4 md:mb-0'>
            <img src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195277/lyxz1fidjtbknrbsqqve.jpg" alt="Blog image" className="w-full h-auto rounded-md" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </div>

          {/* Content Section */}
          <div className='w-full md:w-1/2 flex flex-col justify-between px-1 md:px-6 py-2 font-poppins'>
            <div className="text-sm text-gray-500 mb-2">
              <span className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent font-poppins">
                <b>The Dot Syntax</b>
              </span>
            </div>

            <div className="text-gray-700 text-base leading-6">
              Imagine if a tiny <b>‘dot’</b> changed the course of history. If a person is asked to give a list of the top 5 painters with the greatest legacy, 90% of us will bring up names like <b>M.F. Hussain</b> and <b>Leonardo Da Vinci</b>; however, there have been numerous <b>Indian painters and artists</b> whose legacy has gone unsung, and such is the life of one <b>S.H. Raza.</b>
              <br /> <br />
              <span>
                <b>Syed Haider Raza</b>, born in <b>1922</b> in a sleepy village in <b>Madhya Pradesh</b>, came to be celebrated as <b>India’s finest artist</b>. Raza’s journey began with a schoolteacher’s advice: <b>“Focus on the dot.”</b> Little did he know, that dot would become his lifelong muse. Starting as a <b>landscape painter</b> in Mumbai, Raza focused on capturing the lifestyle and scenery of <b>rural Mumbai.</b> While the flames of the revolution were fanned in the Indian subcontinent, Raza, together with <b>MF Hussain</b>, co-founded the <b>Progressive Arts Group</b>, which broke the shackles of colonial arts and infused Indian flavors into the world’s palette. In <b>1950</b>, he packed his bags and moved to <b>Paris</b>, the land of <b>Picasso</b>, where he studied at the <b>École nationale supérieure des Beaux-Arts</b>. There his focus shifted from realism to <b>geometric abstraction</b>, and his famous <b>‘Bindu’</b> or dot came into place. Raza believed the <b>bindu</b> to be a source of <b>life and energy</b> and ended up making it his <b>modus operandi</b>. His works, like <b>Saurashtra (2010)</b>, broke records, selling for over <b>₹16 crore</b>. But Raza wasn’t just about money or fame. He believed art was a <b>spiritual journey</b>, a way to connect with the cosmos.
              </span>
              <br /><br />
              <span>
                So like the occurrence of the <b>Big Bang</b>, <b>S.H. Raza</b> ended up causing an explosion in the art world with his iconic concept of <b>‘Bindu.’</b> His <b>legacy and brilliance</b> remain unsung to this day, so next time you see a simple <b>dot</b>, remember: it might just be the <b>seed of a masterpiece!</b>
              </span>
            </div>

            <div className="md:mt-4 flex items-center">
              <Heart isClick={isClick} onClick={handleHeartClick} />
              <span className="text-gray-600 text-sm ml-2">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}