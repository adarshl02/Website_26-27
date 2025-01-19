import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-slate-100 py-10 px-6 mt-5 mb-10 md:mb-0">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Left Section: Logo and Address */}
        <div className="space-y-4">
          <img src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195806/zegnantp5rqlmcia9co6.png" alt="Pratibimb Logo" className="w-40" />
          <p className="text-lg font-semibold">Locate us</p>
          <p className="flex items-center space-x-2">
            <LocationOnIcon />
            <span className='text-sm' >SGSITS 23, M.Visvesvaraya Marg, Indore, Madhya Pradesh, 452003</span>
          </p>
          <p className="flex items-center space-x-2">
            <EmailIcon />
            <span className='text-sm' >clubpratibimb.sgsits@gmail.com</span>
          </p>
          {/* Social Icons */}

        </div>

        {/* Middle Section: Discover */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Discover</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="https://bit.ly/3Mu4CN2" target="_blank" rel="noreferrer">
              <InstagramIcon className="text-2xl" />
            </a>
            <a href="https://www.facebook.com/pratibimb.sgsits?mibextid=ZbWKwL" target="_blank" rel="noreferrer">
              <FacebookIcon className="text-2xl" />
            </a>
            <a href="https://www.linkedin.com/company/clubpratibimb/" target="_blank" rel="noreferrer">
              <LinkedInIcon className="text-2xl" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Past Events</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Sepia</Link></li>
            <li><Link to="/" className="hover:underline">Streetscape</Link></li>
            <li><Link to="/" className="hover:underline">Fabrica</Link></li>
          </ul>
        </div>

        {/* Right Section: For You */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">For you</h3>
          <ul className="space-y-2">
            <li><Link to="/profile" className="hover:underline">Certificate</Link></li>
            <li><Link to="/profile" className="hover:underline">Sponsorship</Link></li>
            <li><Link to="/profile" className="hover:underline">Membership</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
