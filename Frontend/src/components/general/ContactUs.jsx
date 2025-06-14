import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function ContactUs() {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="md:mt-6 px-6 md:px-8 lg:px-16">
       <button  className="fixed z-50 top-14 left-2 md:top-6 md:left-10" onClick={() => navigate('/')}>
      <div  ><ArrowBackIcon/></div>
      </button>
      <div className="py-2 text-center md:bg-azure rounded-2xl fixed md:static top-0 left-0 w-full z-40 bg-white">
        <h1 className="text-center bg-gradient-to-br md:mt-12 from-slate-400 to-slate-800 bg-clip-text text-3xl font-extrabold text-transparent md:text-5xl font-poppins">
          Contact Us
        </h1>
      </div>

      <p className="text-center mt-16 md:mt-0 text-gray-600 text-sm md:text-lg font-poppins">
        Get in touch with the team at Pratibimb for any inquiries or support.
      </p>

      <div className="mt-4 md:mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 font-poppins">
        {/* Animesh Bhawsar */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-700">Animesh Bhawsar</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            <strong>Post:</strong> Joint Secretary
          </p>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            <strong>Phone:</strong> +91 8839830466
          </p>
        </div>

        {/* Adarsh Landge */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-700">Adarsh Landge</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            <strong>Post:</strong> Web Head
          </p>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            <strong>Phone:</strong> +91 9200203742
          </p>
        </div>

        {/* Email and Address */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-700">Contact Information</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:teampratibimb.sgsits@gmail.com"
              className="text-blue-500 hover:underline"
            >
            teampratibimb.sgsits@gmail.com
            </a>
          </p>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            <strong>Operating Address:</strong> SGSITS 23, M.Visvesvaraya Marg, Indore, Madhya Pradesh, 452003
          </p>
        </div>
      </div>

      <footer className="mt-10 text-center text-gray-500 text-xs md:text-sm">
        © {new Date().getFullYear()} Pratibimb. All rights reserved.
      </footer>
    </div>
  );
}
