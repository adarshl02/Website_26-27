import { PlaceholdersAndVanishInput } from '../accertinityui/placeholders-and-vanish-input';
import { toast } from 'react-toastify';

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "What did you enjoy the most about our art collection?",
    "How can we improve the user experience on this website?",
    "Do you have any suggestions for future art exhibitions or events?",
    "What features would you like to see added to our website?",
    "How would you rate the overall design and layout of the site?"
  ];
  

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks for your feedback");
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
      We will revert back to your queries in the profile section.
    </p>
  </div>
  
  );
}
