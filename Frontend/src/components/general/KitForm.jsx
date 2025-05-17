import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { CircularProgress } from "@mui/material";
import { finalregisterEvent, finalverifyPayment, registerEvent, verifyPayment } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { loadingEndsSuccess, loadingStart } from "../../redux/loadinganderror/loadinganderrorSlice";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const KitForm = ({ setOpen3, attendee,setRefresh }) => {
    
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
        leaderDriveLink: "",
        leaderPhone: "",
        participant_2_drive: "",
        participant_2_phone: "",
        participant_3_drive: "",
        participant_3_phone: "",
        participant_4_drive: "",
        participant_4_phone: "",
        participant_5_drive: "",
        participant_5_phone: "",
        participant_6_drive: "",
        participant_6_phone: "",
        participant_7_drive: "",
        participant_7_phone: "",
        participant_8_drive: "",
        participant_8_phone: "",
        qrEmail: ""
      });
      

    useEffect(() => {
        if (attendee) {
            setFormData({
                name: attendee.team_leader_name || "",
                phone: attendee.team_leader_phone || "",
                teamName: attendee.team_name || "",
                teamMembers: attendee.team_size || "",
                teamLeaderBatch: attendee.team_leader_batch || "",
                teamLeaderBranch: attendee.team_leader_branch || "",
                participant_2: attendee.sec_participant || "",
                participant_3: attendee.third_participant || "",
                participant_4: attendee.fourth_participant || "",
                participant_5: attendee.fifth_participant || "",
                participant_6: attendee.sixth_participant || "",
                participant_7: attendee.seventh_participant || "",
                participant_8: attendee.eight_participant || "",
                leaderDriveLink: "",
                leaderPhone: attendee.team_leader_phone,
                participant_2_drive: "",
                participant_2_phone: "",
                participant_3_drive: "",
                participant_3_phone: "",
                participant_4_drive: "",
                participant_4_phone: "",
                participant_5_drive: "",
                participant_5_phone: "",
                participant_6_drive: "",
                participant_6_phone: "",
                participant_7_drive: "",
                participant_7_phone: "",
                participant_8_drive: "",
                participant_8_phone: "",
                qrEmail: ""
            });
        }
    }, [attendee]);

    const dispatch = useDispatch();


    const { currentUser } = useSelector((state) => state.user);
    const { token } = useSelector((state) => state.user.currentUser);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('1');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const validateForm = () => {
        const { 
            name, phone, leaderPhone, teamName, teamMembers, teamLeaderBatch, 
            teamLeaderBranch, leaderDriveLink, qrEmail 
        } = formData;
    
        // Required fields validation
        if (
            !name.trim() || 
            !phone.trim() || 
            !leaderPhone.trim() || 
            !teamName.trim() || 
            !teamLeaderBatch.trim() || 
            !teamLeaderBranch.trim() || 
            !leaderDriveLink.trim() || 
            !qrEmail.trim() || 
            teamMembers === ""
        ) {
            toast.error("All fields are required.");
            return false;
        }
    
        // Validate phone number (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            toast.error("Team Leader's phone number must be exactly 10 digits.");
            return false;
        }
    
        if (!phoneRegex.test(leaderPhone)) {
            toast.error("Leader Phone must be exactly 10 digits.");
            return false;
        }
    
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(qrEmail)) {
            toast.error("Please enter a valid email address.");
            return false;
        }
    
        // Convert teamMembers to a number
        const teamSize = Number(teamMembers);
        if (!teamSize || teamSize < 6 || teamSize > 8) {
            toast.error("Please select a valid team size (6-8 members).");
            return false;
        }
    
        // Validate participants' names, phone numbers, and drive links dynamically
        for (let i = 2; i <= teamSize; i++) {
            const nameKey = `participant_${i}`;
            const phoneKey = `participant_${i}_phone`;
            const driveKey = `participant_${i}_drive`;
    
            if (!formData[nameKey]?.trim()) {
                toast.error(`Please enter a name for Participant ${i}.`);
                return false;
            }
    
            if (!formData[phoneKey]?.trim()) {
                toast.error(`Please enter a phone number for Participant ${i}.`);
                return false;
            }
    
            if (!phoneRegex.test(formData[phoneKey])) {
                toast.error(`Participant ${i}'s phone number must be exactly 10 digits.`);
                return false;
            }
    
            if (!formData[driveKey]?.trim()) {
                toast.error(`Please provide a Drive link for Participant ${i}.`);
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
                event_id:3,
                team_leader_email: currentUser.rest.email,
                phoneNumbers: {
                    team_leader: formData.phone,
                    sec_participant: formData.participant_2_phone,
                    third_participant: formData.participant_3_phone,
                    fourth_participant: formData.participant_4_phone,
                    fifth_participant: formData.participant_5_phone,
                    sixth_participant: formData.participant_6_phone,
                    seventh_participant: formData.participant_7_phone || "",
                    eighth_participant: formData.participant_8_phone || "", 
                },
                driveLinks: {
                    team_leader: formData.leaderDriveLink,
                    sec_participant: formData.participant_2_drive,
                    third_participant: formData.participant_3_drive,
                    fourth_participant: formData.participant_4_drive,
                    fifth_participant: formData.participant_5_drive,
                    sixth_participant: formData.participant_6_drive,
                    seventh_participant: formData.participant_7_drive || "",
                    eighth_participant: formData.participant_8_drive || "",
                },
                teamDetails: {
                    team_name: formData.teamName,
                    team_leader_name: formData.name,
                    team_leader_phone: formData.phone,
                    team_leader_batch: formData.teamLeaderBatch,
                    team_leader_branch: formData.teamLeaderBranch,
                    sec_participant: formData.participant_2,
                    third_participant: formData.participant_3,
                    fourth_participant: formData.participant_4,
                    fifth_participant: formData.participant_5,
                    sixth_participant: formData.participant_6,
                    seventh_participant: formData.participant_7 || "",
                    eighth_participant: formData.participant_8 || "",
                }
            };
            
            const response = await finalregisterEvent(payload, token);

            if (response.success) {
                toast.info("Redirecting to Payment Page");
                const { amount, order_id } = response.data;
                handlePayment(order_id, amount);
            } else {
                toast.error(response.message);
                dispatch(loadingEndsSuccess());
            }
        } catch (error) {
            dispatch(loadingEndsSuccess());
            toast.error("Network error. Please try again later.");
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
            name: "Final Event Booking",
            description: "Payment for final event booking",
            prefill: {
                name: formData.name,
                email: currentUser.rest.email,
                contact: formData.phone,
            },
            theme: { color: "#F37254" },
            handler: (response) => verifyPaymentHandler(response),
            // handler: async function (response) {
            //   setFormData({
            //     name: "",
            //     phone: "",
            //     teamName: "",
            //     teamMembers: "",
            //     teamLeaderBatch: "",
            //     teamLeaderBranch: "",
            //     participant_2: "",
            //     participant_3: "",
            //     participant_4: "",
            //     participant_5: "",
            //     participant_6: "",
            //     participant_7: "",
            //     participant_8: "",
            //   });

            //   dispatch(loadingEndsSuccess());
            //   toast.info("Check Your Mail for confirmation");
            //   navigate("/profile");
            // },
            modal: {
                ondismiss: function () {
                    dispatch(loadingEndsSuccess());
                    setLoading(false);
                    setOpen3(false);
                },
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };


    const verifyPaymentHandler = async (response) => {
        try {
            const verificationResponse = await finalverifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email:formData.qrEmail,
            }, token);

            if (verificationResponse.success) {
                setFormData({
                });
                dispatch(loadingEndsSuccess());
                toast.info("Check Your Mail for confirmation");
                toast.success("Payment successful and verified!");
                navigate("/profile");
                setRefresh(prev => !prev);
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
            setOpen3(false);
            setLoading(false);
        }
    };

    return (
        <div className="w-[320px] md:w-[500px] flex items-center justify-center">
            <div className="bg-white text-slate-800 px-6 py-4 md:p-8 rounded-lg shadow-md max-w-xl w-full">

                <h2 className="text-xl font-bold text-center">
                    {step === '1' || step === '2'
                        ? 'Your previous Response'
                        : step === '3'
                            ? 'Enter participant Phone No.'
                            : step === '4'
                                ? 'Enter CollegeID/Library Card Drive Link'
                                : 'Ok Last'}
                </h2>

                {(step === '1' || step === '2') && (
                    <div className="text-center mb-4 text-red-500 opacity-85 font-poppins">Edit the final Changes</div>
                )}


                <form onSubmit={handleSubmit}>
                    {
                        step === '1' ? (
                            <>
                                <div className="my-4">
                                    <label className="block text-sm mb-2" htmlFor="name">
                                        Team Leader Name
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
                                        Team Leader Phone Number
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
                        ) : step === '2' ? (
                            <>

                                {[...Array(Math.max(0, parseInt(formData.teamMembers) - 1) || 0)].map((_, index) => (
                                    <div key={index} className="my-4">
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
                                            type="button"
                                            className="w-full font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-1 md:py-2 rounded-md hover:bg-indigo-500 transition"
                                            onClick={() => setStep('3')}
                                        >
                                            Next  <NavigateNextIcon />
                                        </button>
                                    </div>
                                </div>


                            </>
                        ) : step === '3' ? (
                            <>
                                <div className="my-4">
                                    <input
                                        type="text"
                                        id="leaderPhone"
                                        value={formData.leaderPhone}
                                        className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-base text-sm"
                                        placeholder="Team Leader Phone Number"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {[...Array(Math.max(0, parseInt(formData.teamMembers) - 1) || 0)].map((_, index) => (
                                    <div key={index} className="mb-4">
                                        <input
                                            type="text"
                                            id={`participant_${index + 2}_phone`}
                                            value={formData[`participant_${index + 2}_phone`] || ""}
                                            className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-base text-sm"
                                            placeholder={`Participant ${index + 2} Phone Number`}
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
                                            onClick={() => setStep('2')} // Add your back navigation function
                                        >
                                            <ArrowBackIcon />
                                        </button>
                                    </div>

                                    <div className="w-3/4" >

                                        <button
                                            type="button"
                                            className="w-full font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-1 md:py-2 rounded-md hover:bg-indigo-500 transition"
                                            onClick={() => setStep('4')}
                                        >
                                            Next  <NavigateNextIcon />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : step === '4' ? (

                            <>
                                <div className="text-center text-red-500 text-xs md:text-sm">
                                    Please change your Drive link access to "Anyone with the link can View".
                                </div>
                                <div className="my-4">
                                    <input
                                        type="text"
                                        id="leaderDriveLink"
                                        value={formData.leaderDriveLink}
                                        className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-base text-sm"
                                        placeholder="Team Leader College ID Drive Link"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {[...Array(Math.max(0, parseInt(formData.teamMembers) - 1) || 0)].map((_, index) => (
                                    <div key={index} className="mb-4">
                                        <input
                                            type="text"
                                            id={`participant_${index + 2}_drive`}
                                            value={formData[`participant_${index + 2}_drive`] || ""}
                                            className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-base text-sm"
                                            placeholder={`Participant ${index + 2} College ID Drive Link`}
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
                                            onClick={() => setStep('3')} // Add your back navigation function
                                        >
                                            <ArrowBackIcon />
                                        </button>
                                    </div>

                                    <div className="w-3/4" >

                                        <button
                                            type="button"
                                            className="w-full font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-1 md:py-2 rounded-md hover:bg-indigo-500 transition"
                                            onClick={() => setStep('5')}
                                        >
                                            Next  <NavigateNextIcon />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )  : step === '5' ? (
                            <>
                              <div className="my-4">
                                <label className="text-sm md:text-base">Enter Email where we send Event Ticket</label>
                                <input
                                  type="email"
                                  id="qrEmail"
                                  value={formData.qrEmail}
                                  className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-base text-sm"
                                  placeholder="Enter your email"
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                          
                              <div className="text-sm md:text-base text-gray-700 my-4">
                                <p className="font-semibold">Important Instructions:</p>
                                <ul className="list-disc ml-6">
                                  <li>Pratibimb has the right to disqualify a team if the information is incorrect or the Drive link is inaccessible.</li>
                                  <li>Do not share your event ticket with anyone except your teammates.</li>
                                </ul>
                              </div>
                            
                              <div className="w-full flex gap-2">
                                    <div className="w-1/4" >
                                        <button
                                            type="button"
                                            className=" text-black py-1 md:py-2 rounded-md md:ml-4"
                                            onClick={() => setStep('4')} // Add your back navigation function
                                        >
                                            <ArrowBackIcon />
                                        </button>
                                    </div>

                                    <div className="w-3/4" >

                                        <button
                                            type="submit"
                                            className="w-full font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-1 md:py-2 rounded-md hover:bg-indigo-500 transition"
                                            disabled={loading}

                                        >
                                            {loading ? (
                                                <CircularProgress size={18} color="inherit" />
                                            ) : (
                                                "GO TO PAYMENT →"
                                            )}

                                        </button>
                                    </div>
                                </div>
                              
                            </>
                          ) : null}


                </form>
            </div>
        </div>
    );
};

export default KitForm;
