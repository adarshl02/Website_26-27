import React, { useState } from "react";
import {
    CircularProgress,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerForRecruitment, verifyPaymentForRecruitment } from "../../service/api.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const MembershipForm = ({ setOpen }) => {

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (err) {
            setErr("");
        }
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: currentUser.rest.name,
        phone: "",
        email: currentUser.rest.email,
        branch: "Bachelor of Pharmacy",
        batch: "2028",
        domain: [],
        experience: "",
        otherClubMembership: "",
    });

    const handleDomainChange = (e) => {
        const { value } = e.target;
        const updatedDomains = formData.domain.includes(value)
            ? formData.domain.filter((domain) => domain !== value) // Remove if already selected
            : [...formData.domain, value]; // Add if not selected

        setFormData({ ...formData, domain: updatedDomains });
        if (err) {
            setErr("");
        }
    };

    const handleSubmit = async () => {

        if (
            !formData.name ||
            !formData.phone ||
            !formData.email ||
            !formData.branch ||
            !formData.batch ||
            formData.domain.length === 0 ||
            !formData.experience ||
            !formData.otherClubMembership
        ) {
            toast.error("Please fill in all fields and select at least one domain.");
            return;
        }


        setLoading(true);

        try {
            const response = await registerForRecruitment(formData, currentUser.token);
            if (response.success && response.data !=="Already Registered") {
                toast.success("Successfully registered for recruitments");
                // toast.info("Check your mail for confirmation");
                navigate("/profile");
            }else if(response.data==="Already Registered"){
                toast.info("User is already registered for recruitments");
            }
             else {
                toast.info("Check your profile section");
            }
        } catch (error) {
            toast.error(error.message || "Failed to register. Please try again.");
           
        }finally{
            setLoading(false);
            setOpen(false);
            setFormData({
                name: currentUser.rest.name,
                phone: "",
                email: currentUser.rest.email,
                branch: "Bachelor of Pharmacy",
                batch: "2028",
                domain: [],
                experience: "",
                otherClubMembership: "",
            });
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
            name: "Membership Campaign",
            description: "Payment for Membership Campaign",
            prefill: {
                name: formData.name,
                email: currentUser.rest.email,
                contact: formData.phone,
            },
            theme: { color: "#F37254" },
            handler: (response) => verifyPaymentHandler(response),

            modal: {
                ondismiss: function () {
                    setLoading(false);
                    setOpen(false);
                },
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };


    const verifyPaymentHandler = async (response) => {
        try {
            const verificationResponse = await verifyPaymentForRecruitment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email: currentUser.rest.email,
            }, currentUser.token);

            if (verificationResponse.success) {
                setFormData({
                    name: currentUser.rest.name,
                    phone: "",
                    email: currentUser.rest.email,
                    branch: "Bachelor of Pharmacy",
                    batch: "2028",
                    domain: [],
                    experience: "",
                    otherClubMembership: "",
                });
                setOpen(false);
                toast.success("Payment successful and verified!");
                toast.info("Check your mail for confirmation");
                navigate("/profile");
                // Update the order status to "paid" in the database
            } else {
                toast.info("Check your mail for confirmation");
                // toast.error(verificationResponse.message || "Payment verification failed. Please try again.");
            }
        } catch (error) {
            toast.info("Check your mail for confirmation");
            // toast.error("Error verifying payment. Please try again.");
        } finally {
            setOpen(false);
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg m-4 p-4 md:p-8 max-w-80 md:max-w-lg mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center font-poppins">
                Membership Registration
            </h2>
            <form className="space-y-2 md:space-y-4 text-sm md:text-base overflow-y-auto max-h-[70vh] md:max-h-[80vh] custom-scrollbar px-2">
                <div className="text-gray-800">
                    <label className="block text-gray-600 mb-1">Name</label>
                    <input
                        maxLength={20}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-base text-sm"
                    />
                </div>

                <div className="text-gray-800 text-sm md:text-base">
                    <label className="block text-gray-600 mb-1">Whatsapp Number</label>
                    <input
                        pattern="^\d{10}$"
                        title="Phone number must be exactly 10 digits"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-base text-sm"
                    />
                </div>

                {/* Branch Dropdown */}
                <div className="text-gray-800 text-sm md:text-base">
                    <label className="block text-gray-600 mb-1">Branch</label>
                    <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-base text-sm"
                    >
                        {[
                            "Bachelor of Pharmacy",
                            "Biomedical Engineering",
                            "Civil Engineering",
                            "Computer Science Engineering",
                            "Electronics and Instrumentation Engineering",
                            "Electronics and Telecommunication Engineering",
                            "Electrical Engineering",
                            "Industrial and Production Engineering",
                            "Information Technology Engineering",
                            "Mechanical Engineering",
                        ].map((branch) => (
                            <option key={branch} value={branch}>
                                {branch}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="text-gray-700">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            <span className="text-gray-600 text-sm md:text-base">Batch</span>
                        </FormLabel>
                        <RadioGroup row name="batch" value="Batch 2028">
                            <FormControlLabel
                                value="Batch 2028"
                                control={<Radio checked />}
                                label={<span className="text-sm md:text-base">Batch 2028</span>}
                            />
                        </RadioGroup>
                    </FormControl>
                </div>


                <div className="text-gray-700">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            <span className="text-gray-600 text-sm md:text-base">Domain</span>
                        </FormLabel>
                        <div className="grid grid-cols-2 text-gray-600 text-sm md:text-base">
                            {[
                                "Photography",
                                "Arts",
                                "Web Development",
                                "Content Creation",
                                "Event Management",
                                "Graphics Designer",
                            ].map((domain) => (
                                <FormControlLabel
                                    key={domain}
                                    control={
                                        <Checkbox value={domain} checked={formData.domain.includes(domain)} onChange={handleDomainChange} />
                                    }
                                    label={<span className="text-sm md:text-base">{domain}</span>}
                                />
                            ))}
                        </div>
                    </FormControl>
                </div>

                {/* Prior Experience */}
                <div className="text-gray-800">
                    <label className="block text-gray-600 mb-1">
                        Do you have any prior experience in your chosen Area of Interest? Specify if any.
                    </label>
                    <input
                        maxLength={50}
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-base text-sm"
                    />
                </div>

                {/* Club Membership */}
                <div className="text-gray-800">
                    <label className="block text-gray-600 mb-1">Are you a part (member/volunteer) of any other clubs? If yes, then which?</label>
                    <input
                        maxLength={50}
                        type="text"
                        name="otherClubMembership"
                        value={formData.otherClubMembership}
                        onChange={handleChange}
                        className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 md:text-base text-sm"
                    />
                </div>

                <div className="w-full flex justify-between">
                    <button
                        type="button"
                        onClick={() => { setLoading(false); setOpen(false); }}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow transition w-1/2 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition w-1/2 ml-2"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading ? <CircularProgress size={18} color="inherit" /> : "Submit"}
                    </button>
                </div>

                {err && <div className="text-red-500 text-xs mt-1">{err}</div>}
            </form>

        </div>
    );
};

export default MembershipForm;
