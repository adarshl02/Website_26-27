import React from "react";
import { AnimatedTestimonials } from "../accertinityui/animated-testimonials";

const testimonials = [
  {
    src: "https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951689/d8tvzgty5wlerqtgwtjn.jpg",
    quote: `Art gives me divine experience. This is the only thing that will last forever. I hope my students give their best to both art and to Club Pratibimb.`,
    name: "Prof. D S Ajnar",
    designation: "President, Club Pratibimb",
  },
  {
    src: "https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734950869/yl9bnyss2ivjf4whibhp.jpg",
    quote: `It's been such a pleasure to mentor Club Pratibimb since the past few years.I wish , future of each member of the club be ever filled with joy and ART!`,
    name: "Mr. Alex Kutty",
    designation: "Mentor, Club Pratibimb",
  },
  {
    src: "https://res.cloudinary.com/dhy548whh/image/upload/v1739046842/paswan_uqsbom.jpg",
    quote: `Mentoring Club Pratibimb has been an incredibly fulfilling journey, witnessing the creativity and passion of its members grow.`,
    name: "Prof. Suresh Paswan",
    designation: "Mentor, Club Pratibimb",
  },

];

const ModernCarousel = () => {

  return (
    <>
      
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
