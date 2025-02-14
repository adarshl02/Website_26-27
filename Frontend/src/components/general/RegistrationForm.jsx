import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { CircularProgress } from "@mui/material";
import { registerEvent, verifyPayment } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { loadingEndsSuccess, loadingStart } from "../../redux/loadinganderror/loadinganderrorSlice";

const RegistrationForm = ({ event_id , setOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    teamName: "",
    teamMembers: "",
  });
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user.currentUser);
  const [loadings, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loadingStart());
    try {
      const payload = {
        event_id,
        team_name: formData.teamName,
        team_members: formData.teamMembers,
        name: formData.name,
        email: currentUser.rest.email,
        phone: formData.phone,
      };
  
      const response = await registerEvent(payload,token);
  
      if (response.success) {
        toast.info("Redirecting to Payment Page");
        setOpen(false);
        const { amount, insertion } = response.data.response.data;
        const { order_id } = insertion[0];
        handlePayment(order_id, amount);
      } else {
        toast.error(response.message);
        dispatch(loadingEndsSuccess());
      }
    } catch (error) {
      dispatch(loadingEndsSuccess());
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
      key: import.meta.env.VITE_RAZORPAY_KEY_ID ,
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
      },token);
  
      if (verificationResponse.success) {
        setFormData({
          name: "",
          phone: "",
          teamName: "",
          teamMembers: "",
        });
        dispatch(loadingEndsSuccess());
        toast.info("Check Your Mail for confirmation");
         toast.success("Payment successful and verified!");
        navigate("/profile");
        // Update the order status to "paid" in the database
      } else {
        toast.error(verificationResponse.message || "Payment verification failed. Please try again.");
        dispatch(loadingEndsSuccess());
      }
    } catch (error) {
      dispatch(loadingEndsSuccess());
      console.error("Payment verification error:", error);
      toast.error("Error verifying payment. Please try again.");
    }finally{
      dispatch(loadingEndsSuccess());
    }
  };

  return (
    <div className="m-4 flex items-center justify-center">
      <div className="bg-white text-slate-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          Please fill in your details to continue
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="name">
              Team Lead Name
            </label>
            <input
            maxLength={20}
              type="text"
              id="name"
              value={formData.name}
              className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
              md:text-base text-sm"    
              placeholder="Your Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="phone">
              Phone Number 
            </label>
            <input
              type="tel"
              id="phone"
               pattern="^\d{10}$"
              title="Phone number must be exactly 10 digits"
              value={formData.phone}
              className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
              md:text-base text-sm"                  placeholder="Your Phone Number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2" htmlFor="teamName">
              Team Name
            </label>
            <input
            maxLength={20}
              type="text"
              id="teamName"
              value={formData.teamName}
              className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
              md:text-base text-sm"                  placeholder="Team Name"
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
              className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
              md:text-base text-sm"                  placeholder="Number"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition"
            disabled={loadings}
          >
            {loadings ? (
              <CircularProgress size={18} color="inherit" />
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
