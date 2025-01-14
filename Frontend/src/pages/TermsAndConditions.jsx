import React, { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="md:mt-6 px-6 md:px-8 lg:px-16">
      <div className="py-2 text-center md:bg-azure rounded-2xl fixed md:static top-0 left-0 w-full z-40 bg-white">
        <h1 className="text-center bg-gradient-to-br md:mt-12 from-slate-400 to-slate-800 bg-clip-text text-3xl font-extrabold text-transparent md:text-5xl font-poppins">
          Pratibimb's Terms and Conditions
        </h1>
      </div>

      <p className="text-center mt-24 md:mt-0 text-gray-600 text-sm md:text-lg font-poppins">
        Welcome to Pratibimb! Please read our terms carefully before engaging with our platform. By using our services, including payment processing via Razorpay, you agree to these terms and policies.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 font-poppins">
        {/* Secure Transactions */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-800">Secure Transactions</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Payments made through Pratibimb's platform are processed via Razorpay, ensuring secure, encrypted, and PCI-DSS-compliant transactions.
          </p>
        </div>

        {/* Refund and Cancellation Policy */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-800">Refunds and Cancellations</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Pratibimb does not entertain any refunds or cancellations once a transaction is completed. Please ensure all details are accurate before proceeding with payments.
          </p>
        </div>

        {/* Compliance */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-800">Compliance</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            All users are required to comply with applicable legal and regulatory requirements. Any misuse of Pratibimb's platform is strictly prohibited.
          </p>
        </div>

        {/* Privacy and Data Security */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-800">Privacy and Security</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Pratibimb is committed to safeguarding your personal and payment data. We adhere to robust data protection measures to ensure your information remains secure.
          </p>
        </div>

        {/* Prohibited Transactions */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-800">Prohibited Transactions</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Transactions involving prohibited items or activities, as outlined in Pratibimb's guidelines, are not allowed. Violations may lead to account suspension or legal action.
          </p>
        </div>

        {/* Pratibimb Support */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-800">Need Help?</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            For any issues or queries related to transactions or platform use, please reach out to Pratibimb's support team at &nbsp;
            <a
              href="mailto: clubpratibimb.sgsits@gmail.com"
              className="text-blue-500 hover:underline"
            >
              clubpratibimb.sgsits@gmail.com
            </a>.
          </p>
        </div>
      </div>

      <footer className="mt-10 text-center text-gray-500 text-xs md:text-sm">
        © {new Date().getFullYear()} Pratibimb. All rights reserved.
      </footer>
    </div>
  );
};

export default TermsAndConditions;
