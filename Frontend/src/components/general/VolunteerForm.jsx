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
import { registerVolunteer } from "../../service/api.js";
import { toast } from "react-toastify";


const VolunteerForm = ({ setOpen }) => {
 
  const dispatch = useDispatch();
  const { currentUser} = useSelector((state) => state.user);
  const [loading,setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (err) {
        setErr("");
      }
  };
  const [formData, setFormData] = useState({
    name: currentUser.rest.name,
    phone: "",
    email: currentUser.rest.email,
    branch: currentUser.rest.branch,
    batch: "",
    domain: [],
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
    
    // Validation check
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.branch ||
      !formData.batch ||
      formData.domain.length === 0
    ) {
      
      setErr("Please fill in all fields and select at least one domain.");
      return;
    }

    setLoading(true);

    try {
      const response = await registerVolunteer(formData, currentUser.token);
      if (response.success) {
        toast.success("Registered successfully!");
        toast.success("Check your email for confirmation.");
        setFormData({
          name: "",
          phone: "",
          email: "",
          branch:  "",
          batch: "",
          domain: [],
        });
        setOpen(false);
      } else {
        toast.error(error.message || "Failed to register. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg m-4 p-4 md:p-8 max-w-80 md:max-w-lg mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6 text-center font-poppins">
        Volunteer Registration
      </h2>
      <form  className="space-y-2 md:space-y-4 text-sm md:text-base">
        <div className="text-gray-800">
          <label className="block  text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
            md:text-base text-sm"          />
        </div>
        <div className="text-gray-800 text-sm md:text-base">
          <label className="block text-gray-600 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-1.5 md:py-2 border-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
            md:text-base text-sm"            />
        </div>
        <div className="text-gray-700">
          <FormControl component="fieldset">
            <FormLabel component="legend"><span className="text-gray-600 text-sm md:text-base" >Batch</span></FormLabel>
            <RadioGroup
              row
              name="batch"
              value={formData.batch}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Batch 2027"
                control={<Radio />}
                label={<span className="text-sm md:text-base">Batch 2027</span>}
              />
              <FormControlLabel
                value="Batch 2028"
                control={<Radio />}
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
                    <Checkbox
                      value={domain}
                      checked={formData.domain.includes(domain)}
                      onChange={handleDomainChange}
                    />
                  }
                  label={<span className="text-sm md:text-base">{domain}</span>}
                />
              ))}
            </div>
          </FormControl>
        </div>
        <div className="w-full flex justify-between">
          <button
            type="button"
            onClick={() => setOpen(false)}
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
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
        {err && <div className="text-red-500 text-xs mt-1">{err}</div>}
      </form>
    </div>
  );
};

export default VolunteerForm;
