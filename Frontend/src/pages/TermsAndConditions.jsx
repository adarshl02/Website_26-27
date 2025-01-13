import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="md:mt-6 px-6 md:px-8 lg:px-16">
     
        <div className=" py-2 text-center  md:bg-azure rounded-2xl fixed md:static top-0 left-0 w-full z-40 bg-white" >
        <h1 className="text-center bg-gradient-to-br md:mt-12 from-slate-400 to-slate-800 bg-clip-text text-3xl font-extrabold text-transparent md:text-5xl font-poppins">
          Pratibimb's Terms and Conditions
        </h1>
        </div>
        <p className="text-center mt-24 md:mt-0 text-gray-600 text-sm md:text-lg font-poppins">
          Welcome! Please read our terms carefully before making any transaction. By using Razorpay through our platform, you agree to these terms and policies.
        </p>
   

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 font-poppins">
        {/* Secure Transactions */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-800">Secure Transactions</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Razorpay ensures all transactions are encrypted and meet PCI-DSS compliance. Your payment data is protected at all times.
          </p>
        </div>

        {/* Refund and Cancellation Policy */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-800">Refunds and Cancellations</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Refunds are governed by our policy. Razorpay may deduct applicable transaction fees during cancellations.
          </p>
        </div>

        {/* Compliance */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-800">Compliance</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            All users must comply with legal and regulatory requirements. Misuse of the platform for fraudulent activities is strictly prohibited.
          </p>
        </div>

        {/* Privacy and Data Security */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-800">Privacy and Security</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Razorpay maintains robust data protection measures. All personal and payment details are safeguarded according to its Privacy Policy.
          </p>
        </div>

        {/* Prohibited Transactions */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-800">Prohibited Transactions</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Payments for restricted items as per Razorpay’s guidelines, including illegal goods, are strictly forbidden.
          </p>
        </div>

        {/* Razorpay Contact */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-800">Need Help?</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            For disputes or queries regarding transactions, reach out to Razorpay at{" "}
            <a
              href="https://razorpay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              their support page
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
