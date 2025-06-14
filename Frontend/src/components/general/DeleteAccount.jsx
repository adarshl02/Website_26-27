import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { deleteAccount, logoutUser } from "@/service/api";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CircularProgress } from "@mui/material";
import { signOutFailure, signOutStart, signOutSuccess } from "@/redux/user/userSlice";
import { deleteEvents } from "@/redux/events/eventsSlice";
import { logoutAdmin } from "@/service/api2";

export default function DeleteAccount() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [showpopup, setShowpopup] = useState(false);

    const token = useSelector((state) => state.user?.currentUser?.token);
    const { rest: user = {} } = useSelector((state) => state.user.currentUser) || {};
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Start sign out process
      dispatch(signOutStart());
      dispatch(deleteEvents())
      // Call the logout API function
      const response = user?.email=="teampratibimb@admin.com"?await logoutAdmin(user?.name,token) :await logoutUser();

      // Check if the API call was successful
      if (!response.success) {
        dispatch(signOutFailure(response.message));
        toast.error(response.message);
        return;
      }

      // Sign out from Firebase authentication

      toast.success("You're Signed Out!");
      dispatch(signOutSuccess());
      navigate("/sign-up");
    } catch (error) {
      // Handle any errors during the sign out process
      dispatch(signOutFailure(error.message));
      toast.error("Logout error: " + error.message);
    }
  };

    const handleDeleteAccount = async () => {
        try {
            setLoading(true);
            const data = {
                email: user.email,
            };
            const response = await deleteAccount(data, token);
            if (response.success) {
                await handleLogout();
                toast.success("Account deleted successfully!");
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error deleting account: " + error.message);
        } finally {
            setLoading(false);
            setShowpopup(false);
        }
    }

    return (
        <div className='py-4 md:p-6 flex flex-col justify-center items-center md:mt-16 text-slate-600 px-8'>
            <button className="fixed z-50 top-14 left-2 md:top-6 md:left-10" onClick={() => navigate('/')}>
                <div  ><ArrowBackIcon /></div>
            </button>

            <div className='py-1 rounded-2xl text-center bg-white md:bg-azure fixed md:static  top-0 w-full z-40' >
                <div className=" py-2 md:mb-4 bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-2xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
                    Account Deletion Request
                </div>
            </div>
            <div className='mt-12 md:mt-0' >
                <div className="text-slate-600 text-sm md:text-xl opacity-70 text-center font-poppins">
                    To delete your account and associated data from <strong>Club Pratibimb</strong>,
                    follow the steps below:
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold mb-2">Steps to Delete Your Account:</h2>
                <ol className="list-decimal pl-5 space-y-2">
                    <li>Open the <strong>Club Pratibimb</strong> app.</li>
                    <li>Go to your <strong>Profile</strong> section.</li>
                    <li>Click on <strong>Delete Account</strong> and confirm.</li>
                </ol>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">What Data is Deleted?</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Email, name, and hashed UID (stored in Aiven PostgreSQL).</li>
                    <li>Profile avatar.</li>
                    <li>All app-specific data (e.g., events, preferences).</li>
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Note:</h2>
                <p>
                    Account deletion is irreversible. After deletion, you will be logged out and
                    redirected to the sign-up page.
                </p>
            </div>

            <div className="flex gap-2 w-full justify-center items-center mt-4">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-center hover:bg-red-600"
                    onClick={() => {
                        if (!token) {
                            toast.info("You need to be logged in to delete your account.");
                            navigate('/sign-up');
                        } else {
                            setShowpopup(true);
                        }
                    }}
                >
                    Delete Account
                </button>

                <Link
                    to="/contact-us"
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-center hover:bg-gray-300"
                >
                    Contact Support
                </Link>
            </div>

            {
                showpopup && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 font-poppins min-w-32">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                            <p className="mb-4 ">This action cannot be undone.</p>
                            <div className="inline-flex justify-center gap-4">
                                <button
                                    onClick={() => setShowpopup(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto min-w-[10rem]"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress size={18} color="inherit" />
                                    ) : (
                                        <>
                                            <span>Delete Account</span>
                                            <DeleteOutlineIcon className="text-white" />
                                        </>
                                    )}
                                </button>

                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
}