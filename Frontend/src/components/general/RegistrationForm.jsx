import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { registerEvent, verifyPayment } from "../../service/api";

const RegistrationForm = ({ event_id , setOpen }) => {
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
      const payload = {
        event_id,
        team_name: formData.teamName,
        team_members: formData.teamMembers,
        name: formData.name,
        email: currentUser.email,
        phone: formData.phone,
      };

      const response = await registerEvent(payload);

      if (response?.status === 200) {
        toast.success("Redirecting to Payment Page");
        setOpen(false);
        const { amount, insertion } = response.data.response.data;
        const { order_id } = insertion[0];
        handlePayment(order_id, amount);
      } else {
        toast.error(response?.data?.message || "Unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error in event registration:", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (order_id, amount) => {
    const isRazorpayLoaded = await loadRazorpayScript();
    if (!isRazorpayLoaded) {
      toast.error("Razorpay SDK failed to load. Please check your connection.");
      return;
    }

    const options = {
      key: "rzp_test_skSiom6K8tMSxT", // Replace with your Razorpay key
      amount,
      currency: "INR",
      order_id,
      name: "Event Booking",
      description: "Payment for event booking",
      handler: (response) => verifyPaymentHandler(response),
      prefill: {
        name: formData.name,
        email: currentUser.email,
        contact: formData.phone,
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyPaymentHandler = async (response) => {
    try {
      const verificationResponse = await verifyPayment({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });

      if (verificationResponse?.status === 200) {
        setFormData({
          name: "",
          phone: "",
          teamName: "",
          teamMembers: "",
        });
        toast.success("Payment successful and verified!");
        toast.success("Check Your Mail");
        // Update the order status to "paid" in the database
      } else {
        toast.error("Payment verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error("Error verifying payment. Please try again.");
    }
  };

  return (
    <div className="m-4 flex items-center justify-center">
      <div className="bg-slate-100 text-slate-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          Please fill in your details to continue
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="name">
              Team Lead Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              className="w-full px-4 py-2 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="phone">
              Phone Number for Group joining
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              className="w-full px-4 py-2 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Phone Number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="teamName">
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              value={formData.teamName}
              className="w-full px-4 py-2 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Team Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="teamMembers">
              Number of Team Members
            </label>
            <input
              type="number"
              id="teamMembers"
              value={formData.teamMembers}
              className="w-full px-4 py-2 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Number"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="col-span-full font-bold w-full bg-gradient-to-r from-blue-500 to-purple-950 text-white p-2 rounded hover:bg-slate-600 transition"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "GO TO PAYMENT →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
