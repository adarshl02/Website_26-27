import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { CircularProgress } from "@mui/material";
import { registerEvent, verifyPayment } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { loadingEndsSuccess, loadingStart } from "../../redux/loadinganderror/loadinganderrorSlice";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RegistrationForm = ({ event_id, setOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    teamName: "",
    teamMembers: "",
    teamLeaderBatch: "",
    teamLeaderBranch: "",
    participant_2: "",
    participant_3: "",
    participant_4: "",
    participant_5: "",
    participant_6: "",
    participant_7: "",
    participant_8: "",
  });
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user.currentUser);
  const [loadings, setLoading] = useState(false);
  const [step, setStep] = useState('1');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, phone, teamName, teamMembers, teamLeaderBatch, teamLeaderBranch } = formData;

    // Required fields validation
    if (!name.trim() || !phone.trim() || !teamName.trim() || !teamMembers.trim() ||
      !teamLeaderBatch.trim() || !teamLeaderBranch.trim()) {
      toast.error("All fields are required.");
      return false;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return false;
    }

    // Convert teamMembers to a number
    const teamSize = Number(teamMembers);
    if (!teamSize || teamSize < 6 || teamSize > 8) {
      toast.error("Please select a valid team size (6-8 members).");
      return false;
    }

    // Check participant fields dynamically
    for (let i = 2; i <= teamSize; i++) {
      const key = `participant_${i}`;
      if (!formData[key]?.trim()) {
        toast.error(`Please enter a name for Participant ${i}.`);
        return false;
      }

    }

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    dispatch(loadingStart());
    try {



      const payload = {
        event_id,
        team_name: formData.teamName,
        team_size: formData.teamMembers,
        team_leader_name: formData.name,
        team_leader_email: currentUser.rest.email,
        team_leader_phone: formData.phone,
        team_leader_batch: formData.teamLeaderBatch,
        team_leader_branch: formData.teamLeaderBranch,
        sec_participant: formData.participant_2,
        third_participant: formData.participant_3,
        fourth_participant: formData.participant_4,
        fifth_participant: formData.participant_5,
        sixth_participant: formData.participant_6,
        seventh_participant: formData.participant_7,
        eight_participant: formData.participant_8,
      };

      const response = await registerEvent(payload, token);
      
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
      key: "rzp_live_jgWi5msqZ2nMVU",
      amount,
      currency: "INR",
      order_id,
      name: "Event Booking",
      description: "Payment for event booking",
      prefill: {
        name: formData.name,
        email: currentUser.rest.email,
        contact: formData.phone,
      },
      theme: { color: "#F37254" },
  
      handler: async function (response) {
        setFormData({
          name: "",
          phone: "",
          teamName: "",
          teamMembers: "",
          teamLeaderBatch: "",
          teamLeaderBranch: "",
          participant_2: "",
          participant_3: "",
          participant_4: "",
          participant_5: "",
          participant_6: "",
          participant_7: "",
          participant_8: "",
        });
  
        dispatch(loadingEndsSuccess());
        toast.info("Check Your Mail for confirmation");
        navigate("/profile");
      },
  
      modal: {
        ondismiss: function () {
          dispatch(loadingEndsSuccess());
        },
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
      }, token);

      if (verificationResponse.success) {
        setFormData({
          name: "",
          phone: "",
          teamName: "",
          teamMembers: "",
          teamLeaderBatch: "",
          teamLeaderBranch: "",
          participant_2: "",
          participant_3: "",
          participant_4: "",
          participant_5: "",
          participant_6: "",
          participant_7: "",
          participant_8: "",
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
    } finally {
      dispatch(loadingEndsSuccess());
    }
  };

  return (
    <div className="w-[320px] md:w-[500px] flex items-center justify-center">
      <div className="bg-white text-slate-800 px-6 py-4 md:p-8 rounded-lg shadow-md max-w-xl w-full">

        <h2 className="text-2xl font-bold mb-4 text-center">
          {step === '1' ? 'Please fill in your details to continue' : 'Enter participant names'}
        </h2>

        <form onSubmit={handleSubmit}>
          {
            step === '1' ? (
              <>
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
                    Team Phone Number
                  </label>
                  <input
                    maxLength={10}
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
                  <label className="block text-sm mb-2" htmlFor="teamLeaderBatch">
                    Team Leader Batch
                  </label>
                  <input
                    type="text"
                    id="teamLeaderBatch"
                    value={formData.teamLeaderBatch}
                    className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
                md:text-base text-sm"                  placeholder="Your Batch (Eg. 2026)"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-2" htmlFor="teamLeaderBranch">
                    Team Leader Branch
                  </label>
                  <input
                    type="text"
                    id="teamLeaderBranch"
                    value={formData.teamLeaderBranch}
                    className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
                md:text-base text-sm"                  placeholder="Your Branch (Eg. IT)"
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
                  <select
                    id="teamMembers"
                    value={formData.teamMembers}
                    className="w-full px-4 py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-base text-sm"
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Team Size</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>



                <button
                  className="w-full font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-1 md:py-2 px-4 rounded-lg hover:bg-indigo-500 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!formData.teamMembers) {
                      toast.error("Please select the number of team members.");
                      return;
                    }
                    setStep("2");
                  }}
                >
                  Next  <NavigateNextIcon />
                </button>

              </>
            ) : (
              <>

                {[...Array(Math.max(0, parseInt(formData.teamMembers) - 1) || 0)].map((_, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      id={`participant_${index + 2}`}
                      value={formData[`participant_${index + 2}`] || ""}
                      className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-base text-sm"
                      placeholder={`Participant ${index + 2}`}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}


                <div className="w-full flex gap-2">
                  <div className="w-1/4" >
                    <button
                      type="button"
                      className=" text-black py-1 md:py-2 rounded-md md:ml-4"
                      onClick={() => setStep('1')} // Add your back navigation function
                    >
                      <ArrowBackIcon />
                    </button>
                  </div>

                  <div className="w-3/4" >

                    <button
                      type="submit"
                      className="w-full font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-1 md:py-2 rounded-md hover:bg-indigo-500 transition"
                      disabled={loadings}
                    >
                      {loadings ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : (
                        "GO TO PAYMENT →"
                      )}
                    </button>
                  </div>
                </div>


              </>
            )
          }


        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
