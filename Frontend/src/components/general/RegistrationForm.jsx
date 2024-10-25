import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Remember to import the toast CSS

const RegistrationForm = ({ event_id }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    teamName: "",
    teamMembers: "",
  });
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/register?event_id=${event_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team_name: formData.teamName,
          team_members: formData.teamMembers,
          name: formData.name,
          email: currentUser.email,
          phone: formData.phone,
        }),
      });

      if (res.status === 200) {
        toast.success("Registration successful! Check Your Mail");
      } else if (res.status === 400) {
        toast.error("There was an issue with your submission.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center z-50">
      <div className="bg-violet-500 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">
          Please fill in your details to continue
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-slate-300 text-sm mb-2" htmlFor="name">
              Team Lead Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-slate-300 text-sm mb-2" htmlFor="phone">
              Phone Number for Group joining
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Phone Number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-slate-300 text-sm mb-2" htmlFor="teamName">
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              value={formData.teamName}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Team Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-slate-300 text-sm mb-2" htmlFor="teamMembers">
              Number of Team Members
            </label>
            <input
              type="number"
              id="teamMembers"
              value={formData.teamMembers}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Number"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 uppercase font-bold text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300 flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Go to Payment →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
