import React, { useState } from "react";
import { FileUpload } from "../accertinityui/file-upload";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadArtCommunityDetails } from "../../service/api";
import { CircularProgress } from "@mui/material";

export default function ArtCommunityForm({ setOpen }) {
  const { rest: user, token } = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: "",
    instagram_id: "",
    description: "",
    file: null,
  });
  const [resetTrigger, setResetTrigger] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (files) => {
    setFormData((prevData) => ({ ...prevData, file: files[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !formData.phone ||
      !formData.instagram_id ||
      !formData.description ||
      !formData.file
    ) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);

    setError(null); // Clear any previous error messages

    try {
      // Create a FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("instagram_user_id", formData.instagram_id);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.file);

      // Call the API using the refactored function
      const result = await uploadArtCommunityDetails(formDataToSend, token);

      if (result.success) {
        toast.success("Form submitted successfully!");
        toast.success("Check your Mail");
        console.log("API Response:", result.data);

        // Reset form and close the modal
        handleCancel();
        setOpen(false);
      } else {
        toast.error(result.message || "Something went wrong!");
        console.error("API Error:", result.message);
      }
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: "",
      instagram_id: "",
      description: "",
      file: null,
    });
    setResetTrigger((prev) => !prev); // Toggle resetTrigger to reset the FileUpload component
  };

  return (
    <div className="w-full max-w-4xl bg-white shadow-2xl p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col text-lg space-y-4 text-gray-800 font-poppins">
            <div>
              <label htmlFor="phone" className="block font-medium">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
                md:text-base text-sm"
              />
            </div>

            <div>
              <label htmlFor="instagram_id" className="block font-medium">
                Instagram ID
              </label>
              <input
                type="text"
                id="instagram_id"
                name="instagram_id"
                value={formData.instagram_id}
                onChange={handleChange}
                className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
                md:text-base text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
                md:text-base text-sm"
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mt-4">
              <FileUpload
                onChange={handleFileChange}
                resetTrigger={resetTrigger}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="mr-4 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 relative"
            disabled={loading}
          >
            {/* Loader spinner overlay */}
            {loading && (
              <CircularProgress
                size={22}
                color="inherit"
                className="absolute inset-0 m-auto"
              />
            )}

            {/* Button text */}
            <span className={loading ? "opacity-0" : "opacity-100"}>
              Submit
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
