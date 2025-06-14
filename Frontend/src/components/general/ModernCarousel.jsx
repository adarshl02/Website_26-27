import React from "react";
import { AnimatedTestimonials } from "../accertinityui/animated-testimonials";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-y-10 px-4 md:px-8 mt-10 md:mt-20">
      {/* Policy Cards Section */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-1  md:gap-4">
        {/* Privacy Policy Card */}
        <motion.div

          className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden transition-all "
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-50">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Privacy Policy</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">Review our policies and how we handle your data.</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/privacy-policy")}
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all hover:bg-gradient-to-r hover:from-slate-500 hover:to-slate-600"
            >
              View Policy
            </motion.button>
          </div>
        </motion.div>

        {/* Contact Us Card */}
        <motion.div
          className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden transition-all "
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-50">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Contact Us</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">Have questions? Reach out to our support team.</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact-us")}
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all hover:bg-gradient-to-r hover:from-slate-500 hover:to-slate-600"
            >
              Get in Touch
            </motion.button>
          </div>
        </motion.div>

        {/* Delete Account Card */}
        <motion.div

          className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden transition-all "
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-50">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Account</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">Manage or delete your account permanently.</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/delete-account")}
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-sm hover:bg-gradient-to-r hover:from-slate-500 hover:to-slate-600 transition-all"
            >
              Delete Account
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-center md:gap-10">
        {/* Left Section: Title */}
        <div className="col-span-1 md:col-span-2 text-center md:text-left">
          <div className=" mb-2 mx-auto md:ml-16 md:text-left bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
            Supporting <span className="md:hidden">Pillars</span>
            <span className="hidden md:block mt-2">Pillars</span>
          </div>
        </div>

        {/* Right Section: Testimonials */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </div>
  );
};

export default ModernCarousel;