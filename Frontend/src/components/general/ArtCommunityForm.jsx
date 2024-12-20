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
   <div className="w-full max-w-[400px] md:max-w-4xl bg-white shadow-2xl p-6 rounded-lg md:mx-auto mx-4">
  <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-6">
      {/* Left Column */}
      <div className="flex flex-col text-sm md:text-lg space-y-1 md:space-y-4 text-gray-800 font-poppins">
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
            className="w-full px-3 py-2 md:py-2 border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs md:text-sm"
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
            className="w-full px-3 py-2 md:py-2 border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs md:text-sm"
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
            rows={4}
            className="w-full px-3 py-1.5 md:py-2 border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs md:text-sm"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="">
   <div className="flex justify-center md:justify-start">
    <FileUpload
      onChange={handleFileChange}
      resetTrigger={resetTrigger}
      className="max-w-full" // Smaller width for mobile
    />
  </div>
</div>
    </div>

    {/* Error Message */}
    {error && <p className="text-red-600 text-xs md:text-sm mt-4">{error}</p>}

    <div className="mt-6 flex justify-between md:justify-end space-x-2 md:space-x-4">
      <button
        type="button"
        onClick={handleCancel}
        className="py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="relative py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 disabled:opacity-50"
        disabled={loading}
      >
        {loading && (
          <CircularProgress
            size={18} // Smaller spinner for mobile
            color="inherit"
            className="absolute inset-0 m-auto"
          />
        )}
        <span className={loading ? "opacity-0" : "opacity-100"}>Submit</span>
      </button>
    </div>
  </form>
</div>

  );
}
