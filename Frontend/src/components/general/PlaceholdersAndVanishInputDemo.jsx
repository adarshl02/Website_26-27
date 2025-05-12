import { useState } from 'react';
import { PlaceholdersAndVanishInput } from '../accertinityui/placeholders-and-vanish-input';
import { toast } from "sonner";
import { useSelector } from 'react-redux';
import { submitfeedback } from '../../service/api';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "What did you enjoy the most about our art collection?",
    "How can we improve the user experience on this website?",
    "Do you have any suggestions for future art exhibitions or events?",
    "What features would you like to see added to our website?",
    "How would you rate the overall design and layout of the site?"
  ];
  
  const [feedback,setFeedback]= useState("");
  const {token,rest:user} = useSelector((state)=>state.user.currentUser);

  const navigate = useNavigate();

  const handleChange = (e) => {
   setFeedback(e.target.value);
   
  };

  const onSubmit = async(e) => {
    e.preventDefault();

      const data={
        feedback:feedback,
        name:user.name,
      }
    try{
      const response = await submitfeedback(data,token);
      if(response.success){
        toast.success("Thanks for your feedback"); 
        }else{
          toast.error("Error submitting feedback");
        }

    }catch(error){
      toast.error("Error submitting feedback");
    }
  };

  return (
    <div className="mt-8 md:my-4 flex flex-col justify-center items-center px-4">
    <h2 className="mb-4 md:mb-8 text-center bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text text-2xl font-medium tracking-tight text-transparent md:text-5xl font-poppins">
      Post any queries or Feedback!
    </h2>
    
    {/* Input section */}
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  
    {/* Bottom Message */}
    <p className="mt-4 text-xs md:text-sm text-gray-500 text-center">
      We will revert back to your queries via mail.
    </p>

   <div className=" mt-10 p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
      <div className="flex justify-center bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-5xl font-poppins">
        Privacy and Policy
      </div>
      <div className="mt-2 text-slate-500 text-sm md:text-base px-1 font-poppins">
        Review our policies of Pratibimb and how we handle your data.
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/privacy-policy")}
        className="w-full mt-4 text-xs md:text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all"
      >
        View Polices
      </motion.button>
    </div>
  </div>
  
  );
}
