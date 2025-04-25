import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function DeleteAccount() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className='py-4 md:p-6 flex flex-col justify-center items-center md:mt-16 text-slate-600 px-8'>


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
                <Link
                    to="/profile"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-center hover:bg-red-600"
                >
                    Delete Account
                </Link>

                <Link
                    to="/contact-us"
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-center hover:bg-gray-300"
                >
                    Contact Support
                </Link>
            </div>
        </div>
    );
}