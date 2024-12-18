import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnimatedTestimonials } from "../accertinityui/animated-testimonials";

const testimonials = [
  {
    src: "https://res.cloudinary.com/dhy548whh/image/upload/v1734528470/ItsMe2_2_t3tvmi.png",
    quote: `It been such a pleasure to mentor Club Pratibimb since the past few years.I wish that the future of each member of the club be ever filled with love, joy, happiness, and ART!`,
    name: "Mr. Paswan",
    designation: "Mentor, Club Pratibimb",
  },
  {
    src: "/kutty.jpeg",
    quote: `It's been such a pleasure to mentor Club Pratibimb since the past few years.I wish that the future of each member of the club be ever filled with love, joy, happiness, and ART!`,
    name: "Mr. Alex Kutty",
    designation: "Mentor, Club Pratibimb",
  },
  {
    src: "/ajnar.jpeg",
    quote: `Art gives me divine experience. This is the only thing that will last forever. I hope my students give their best to both art and to Club Pratibimb.`,
    name: "Prof. D S Ajnar",
    designation: "Mentor, Club Pratibimb",
  },
];

const ModernCarousel = () => {
  //   const settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     autoplay: true,
  //     autoplaySpeed: 5000,
  //     arrows: true,
  //     pauseOnHover: false,
  //   };

  return (
    <>
      {/* <div className="mt-8 text-center bg-gradient-to-br from-slate-600 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-7xl font-poppins py-2">
        Supporting Pillars
      </div> */}
      {/* <div className="px-16 md:px-28">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              
              <div className="p-2 md:p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 rounded-full shadow-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="mx-auto object-cover w-20 h-20 md:w-40 md:h-40 border-4 border-white rounded-full"
                />
              </div>
              <p className="bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text text-xs font-medium tracking-tight text-transparent md:text-2xl font-poppins">
                "{item.testimonial}"
              </p>
              <p className="text-emerald-500 font-semibold mt-4 text-xl">{item.name}</p>
              <p className="text-slate-600 text-sm">{item.designation}</p>
            </div>
          ))}
        </Slider>
      </div> */}
      <div className="mx-10 mt-20 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-center md:gap-10">
        {/* Left Section: Title */}
        <div className="col-span-1 md:col-span-2 text-center md:text-left">
          <div className="mb-2 mx-auto md:ml-16   md:text-left bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
            Supporting <span className="md:hidden">Pillars</span>
            
            <span className="hidden md:block mt-2 ">Pillars</span>
          </div>
        </div>

        {/* Right Section: Testimonials */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </>
  );
};

export default ModernCarousel;
