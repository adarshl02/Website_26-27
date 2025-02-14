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
        {/* Mona Lisa's Rise to Power */}
        <div className="w-full max-w-6xl flex flex-wrap bg-white shadow-lg rounded-2xl p-4 md:p-6 md:mt-8 mt-4">
          {/* Image Section */}
          <div className='w-full md:w-1/2 flex justify-center items-start md:mt-20 mb-4 md:mb-0'>
            <img src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1739537248/download_lurnnp.png" alt="Blog image" className="w-full h-auto rounded-md" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </div>

          {/* Content Section */}
          <div className='w-full md:w-1/2 flex flex-col justify-between px-1 md:px-6 py-2 font-poppins'>
            <div className="text-sm text-gray-500 mb-2">
              <span className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent font-poppins">
                Mona Lisa’s Rise to Power
              </span>
              <span className="block font-bold mt-2">Date Posted: February 17, 2025</span>
            </div>

            <div className="text-gray-700 text-base leading-6">
              Stealing is bad; however, sometimes it can get you immense fame and popularity, such is the case of arguably the world's most famous painting, the “Mona Lisa” by Leonardo da Vinci.
              <br /> <br />
              <span>
                The Mona Lisa is considered one of the biggest masterpieces of the Renaissance era. It was completed by da Vinci in 1519 in Florence, Italy, after which it was acquired by King Francis I of France and eventually the Louvre Museum. The woman in the painting is believed to be Lisa Gherardini, the wife of a Florentine merchant. In the beginning it was just another painting until in 1911 it was unexpectedly stolen from the Louvre by an Italian handyman named Vincenzo Peruggia, who believed the painting belonged in Italy.
              </span>
              <br /><br />
              <span>
                The story of the theft is one of its kind. Vincenzo worked as a handyman in the Louvre and actually helped set up the painting's frame. Driven by the feeling of patriotism, he walked into the gallery when the museum was under maintenance and hid inside the broom closet for a full day! At midnight he came out of the closet and simply walked out with the painting. After that day the whole world roared with “Louvre has failed” and the pandemonium created laid the groundwork for the painting’s unprecedented success. The police were so baffled that they actually ended up arresting Pablo Picasso and accused him of jealousy! After being badgered for 2 years, police recovered the painting in 1913, being sold to an art gallery in Italy. The painting was then returned to the Louvre and has since been a spectacle of popularity and pride for the museum.
              </span>
              <br /> <br />
              <span>
                That is the story of how a “patriotic theft “ via a broom closet shook the art world and created a sensation for all the people, a sensation so iconic that there have been actual research studies on the makings of this masterpiece. The Mona Lisa is always going to be a beautiful piece of art, but beyond that, it will always be an awestrucking story of how a theft created a monopoly out of art.

              </span>
            </div>

            <div className="md:mt-4 flex items-center">
              <Heart isClick={isClick} onClick={handleHeartClick} />
              <span className="text-gray-600 text-sm ml-2">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </div>
          </div>
        </div>

         {/* A Different Starry Night */}
         <div className="w-full max-w-6xl flex flex-wrap bg-white shadow-lg rounded-2xl p-4 md:p-6 md:mt-8 mt-4">
          {/* Image Section */}
          <div className='w-full md:w-1/2 flex justify-center items-start md:mt-20 mb-4 md:mb-0'>
            <img src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1739537246/Starry_Night_Over_the_Rhone_jsi6yr.jpg" alt="Blog image" className="w-full h-auto rounded-md" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </div>

          {/* Content Section */}
          <div className='w-full md:w-1/2 flex flex-col justify-between px-1 md:px-6 py-2 font-poppins'>
            <div className="text-sm text-gray-500 mb-2">
              <span className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent font-poppins">
                A Different Starry Night
              </span>
              <span className="block font-bold mt-2">Date Posted: February 17, 2025</span>
            </div>

            <div className="text-gray-700 text-base leading-6">
              Stepping into the world of art, every individual goes through one thing without a doubt, that is falling in love with Vincent Van Gogh’s famous ‘Starry Night.’ The majestic painting that captures your eyes and the essence of nature in one striking canvas. However, do you know that Van Gogh’s brilliance was not limited to just that one starry night? In his lifetime, he actually painted 2 different starry nights, one of which is yet to be discovered by the masses.
              <br /> <br />
              <span>
                “Starry Night Over the Rhone” is a painting created in 1888 in the city of Arles. While the traditional starry night focused on the beauty and connection of nature with man, the second painting showed a stark contrast to his previous focus, heavily on stars and reflections. While the moon is luminous and captivating, it is transient, waning over time, much like the fleeting moments of perfection in life. In contrast, the stars remain steadfast, their light enduring no matter how the Earth shifts or turns. This contrast mirrors the human experience: the moon represents the ephemeral nature of joy and beauty, while the stars symbolize the relentless, unchanging nature of hope and perseverance.The stars, infinite and unchanging, become a metaphor for the endless struggle inherent in life. Yet, they also embody hope—a constant, guiding light even in the darkest of times.
              </span>
              <br /><br />
              <span>
                Van Gogh's artistic brilliance is a well-known fact; for a person who battled mental illness for a long time, the stars highlighted in his second starry night became the icon of hope for him, constantly twinkling but always out of reach. “Starry Night Over the Rhône “ is a masterpiece that invites us to reflect that our brightest moments may fade, but like the stars, our hope and resilience can remain eternal.
              </span>
            </div>

            <div className="md:mt-4 flex items-center">
              <Heart isClick={isClick} onClick={handleHeartClick} />
              <span className="text-gray-600 text-sm ml-2">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </div>
          </div>
        </div>

         {/* The Dot Syntax */}
         <div className="w-full max-w-6xl flex flex-wrap bg-white shadow-lg rounded-2xl p-4 md:p-6 md:mt-8 mt-4">
          {/* Image Section */}
          <div className='w-full md:w-1/2 flex justify-center items-start md:mt-20 mb-4 md:mb-0'>
            <img src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1739537253/25_800x_v8rpbc.png" alt="Blog image" className="w-full h-auto rounded-md" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </div>

          {/* Content Section */}
          <div className='w-full md:w-1/2 flex flex-col justify-between px-1 md:px-6 py-2 font-poppins'>
            <div className="text-sm text-gray-500 mb-2">
              <span className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent font-poppins">
                The Dot Syntax
              </span>
              <span className="block font-bold mt-2">Date Posted: February 17, 2025</span>
            </div>

            <div className="text-gray-700 text-base leading-6">
              Imagine if a tiny ‘dot’ changed the course of history. If a person is asked to give a list of the top 5 painters with the greatest legacy, 90% of us will bring up names like M.F. Hussain and Leonardo Da Vinci; however, there have been numerous Indian painters and artists whose legacy has gone unsung, and such is the life of one S.H. Raza.
              <br /> <br />
              <span>
                Syed Haider Raza, born in 1922 in a sleepy village in Madhya Pradesh, came to be celebrated as India’s finest artist. Raza’s journey began with a schoolteacher’s advice: “Focus on the dot.” Little did he know, that dot would become his lifelong muse. Starting as a landscape painter in Mumbai, Raza focused on capturing the lifestyle and scenery of rural Mumbai. While the flames of the revolution were fanned in the Indian subcontinent, Raza, together with MF Hussain, co-founded the progressive arts group, which broke the shackles of colonial arts and infused Indian flavors into the world’s palette. In 1950 he packed his bags and moved to Paris, the land of Picasso, where he studied at the École nationale supérieure des Beaux-Arts. There his focus shifted from realism to geometric abstractism, and his famous ‘Bindu’ or dot came into place. Raza believed the bindu to be a source of life and energy and ended up making it his modus operandi. His works, like Saurashtra (2010), broke records, selling for over ₹16 crore. But Raza wasn’t just about money or fame. He believed art was a spiritual journey, a way to connect with the cosmos.
              </span>
              <br /><br />
              <span>
                So like the occurrence of the big bang, S.H. Raza ended up causing an explosion in the art world with his iconic concept of ‘bindu.’. His legacy and brilliance remains unsung till date so next time you see a simple dot, remember: it might just be the seed of a masterpiece!
              </span>
            </div>

            <div className="md:mt-4 flex items-center">
              <Heart isClick={isClick} onClick={handleHeartClick} />
              <span className="text-gray-600 text-sm ml-2">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </div>
          </div>
        </div>

         {/* Jungles and Pots */}
         <div className="w-full max-w-6xl flex flex-wrap bg-white shadow-lg rounded-2xl p-4 md:p-6 md:mt-8 mt-4">
          {/* Image Section */}
          <div className='w-full md:w-1/2 flex justify-center items-start md:mt-20 mb-4 md:mb-0'>
            <img src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1739538240/Rogan-Art-by-Rizwan-Khatri-2_2400x_ngc3zs.png" alt="Blog image" className="w-full h-auto rounded-md" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </div>

          {/* Content Section */}
          <div className='w-full md:w-1/2 flex flex-col justify-between px-1 md:px-6 py-2 font-poppins'>
            <div className="text-sm text-gray-500 mb-2">
              <span className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent font-poppins">Jungles and Pots</span>
              <span className="block font-bold mt-2">Date Posted: February 17, 2025</span>
              {/* <span className="block font-bold">Credited by: John Doe (<a href="https://instagram.com/johndoe" className="text-blue-500 hover:underline" target="_blank">@johndoe</a>)</span> */}
            </div>

            <div className="text-gray-700 text-base leading-6">
              Indian art—when we say this, the world sees images of women carrying pots and a few celestial paintings of the gods. Because surely, a country with such staggering diversity, countless cultures, and centuries of history couldn’t possibly have more than one art form. How could a land so vast and varied ever produce anything beyond that?
              <br /> <br />
              <span>
                Today, let's get introduced to two hidden and well-kept secret art forms of India that are definitely not pots and jungles. First, from the bustling hub of Bihar, we have the manjusha paintings. Hailing from the ancient town of Anga Manjusha art is a vibrant, lesser-known gem deeply tied to the folklore of the Bishahari festival, which honors the serpent deity and the goddess Durga. The name "Manjusha" (meaning "box") refers to the intricately painted cylindrical bamboo boxes used to carry ceremonial offerings during processions. This art is characterized by its angular, linear patterns, vibrant hues of green, yellow, and red, and narrative depictions of the goddess’s triumph over evil.Now, let’s pivot southwest to the arid landscapes of Kutch, Gujarat, where the centuries-old craft of Roghan painting defies stereotype. Roghan is a mesmerizing technique where castor oil is boiled into a thick paste, mixed with pigments, and painstakingly "drawn" onto fabric using a thin metal rod. Artists work backward, folding the cloth to imprint mirror-image patterns, creating symmetrical masterpieces of flora, peacocks, and the iconic "Tree of Life." Practiced exclusively by the Khatri community for generations, this art nearly vanished until recent revival efforts. India’s art forms are like its languages: distinct, evolving, and rooted in local soil.
              </span>
              <br /><br />
              <span>
                So there we begin a journey to Indian art, which is far more than a collection of familiar patterns. It’s a vibrant, living testament to the country’s rich cultural diversity and history—a Pandora’s box of unseen masterpieces and untold stories. Let's together bring them to light.              </span>
            </div>


            <div className="md:mt-4 flex items-center">
              <Heart isClick={isClick} onClick={handleHeartClick} />
              <span className="text-gray-600 text-sm ml-2">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </div>
          </div>
        </div>

        {/* Skull Art */}
        <div className="w-full max-w-6xl flex flex-wrap bg-white shadow-lg rounded-2xl p-4 md:p-6 md:mt-8">
          {/* Image Section */}
          <div className='w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0'>
            <img src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195277/lyxz1fidjtbknrbsqqve.jpg" alt="Blog image" className="w-full h-auto rounded-md" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </div>

          {/* Content Section */}
          <div className='w-full md:w-1/2 flex flex-col justify-between px-1 md:px-6 py-2'>
            <div className="text-sm text-gray-500 mb-2">
              <span className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent font-poppins">Art and Culture</span>
              <span className="block font-bold mt-2">Date Posted: February 17, 2025</span>
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

        {/* The World of Colors */}
        <div className="w-full max-w-6xl flex flex-wrap bg-white shadow-lg rounded-2xl p-4 md:p-6 md:mt-8 mt-4">
          {/* Image Section */}
          <div className='w-full md:w-1/2 flex justify-center items-start md:mt-20 mb-4 md:mb-0'>
            <img src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1739537246/images_gtcxgx.jpg" alt="Blog image" className="w-full h-auto rounded-md" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </div>

          {/* Content Section */}
          <div className='w-full md:w-1/2 flex flex-col justify-between px-1 md:px-6 py-2 font-poppins'>
            <div className="text-sm text-gray-500 mb-2">
              <span className="bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent font-poppins">
                The World Of Colors
              </span>
              <span className="block font-bold mt-2">Date Posted: February 17, 2025</span>

            </div>

            <div className="text-gray-700 text-base leading-6">
              Colors are scientifically defined as “the visual perception of how light reflects off of objects” sounds boring doesn't it? Well artists have been playing with this notion of colors since forever. Colors tend to evoke specific emotions in human beings when looked at, this can be seen in countless famous paintings across history. So the question that remains is ‘what are the stories that colors tell us?’
              <br /> <br />
              <span>
                Red:
                Red is the color of extremes. In Renaissance art, it symbolized divine love or mortal danger . In Chinese culture, red heralds luck and celebration, while in Western contexts, it can signal alarm or sensuality. Edvard Munch’s ‘The Scream’ uses a lurid red sky to mirror existential dread, proving red’s power to unsettle and captivate.
              </span>
              <br /><br />
              <span>
                Blue:
                Blue’s duality lies in its ability to evoke both serenity and sorrow. Picasso’s ‘Blue Period’ drowns in hues of loneliness and despair. In religious art, the Virgin Mary’s blue cloak signifies purity and heavenly grace, a tradition rooted in the costly ultramarine pigment once reserved for sacred subjects.
              </span>
              <br /> <br />
              <span>
                Yellow:
                Yellow dances between radiance and caution. Van Gogh’s sunflowers burst with optimism, yet in medieval art, yellow often marked betrayal. In Hindu and Buddhist traditions, golden yellows symbolize enlightenment, illuminating deities like the radiant Buddha.

              </span>

              <br /> <br />
              <span>
                Green:
                Green breathes life into art, from Monet’s lush water lilies to the symbolic use of jade in Chinese art for immortality. Yet, it can also hint at toxicity—think of the sickly green in depictions of jealousy or decay.

              </span>
              <br /> <br />
              <span>
                Black and White
                Black absorbs light and meaning, representing mourning (as in Goya’s dark portraits) or sophistication . White, conversely, signifies purity in Renaissance angelic robes or emptiness in Malevich’s ‘White on White’. Together, they create stark contrasts, as seen in Japanese ink paintings or the bold graphic works of Franz Kline.

                In the hands of an artist, color becomes a language—a way to channel emotions, critique society, or bridge cultures. So Next time you stand before a painting, ask it to tell you a story and let the colors speak to you.

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