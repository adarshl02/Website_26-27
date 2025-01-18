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
          <h2 className="text-lg font-bold text-gray-700">Secure Transactions</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Payments made through Pratibimb's platform are processed via Razorpay, ensuring secure, encrypted, and PCI-DSS-compliant transactions. Your payment data is only used to complete the transaction and is not stored thereafter.
          </p>
        </div>

        {/* Razorpay and Third-Party Policies */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-700">Third-Party Policies</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Payments on Pratibimb are processed via Razorpay. Please review Razorpay's policies for detailed information on payment processing and data handling at 
            <a
              href="https://razorpay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
             &nbsp; Razorpay Policies
            </a>.
          </p>
        </div>

        {/* Customer Responsibilities */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
          <h2 className="text-lg font-bold text-gray-700">Customer Responsibilities</h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base">
            Customers are responsible for providing accurate information during transactions. Failure to do so may result in delays or transaction failures, for which Pratibimb is not liable.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-center text-2xl font-bold text-gray-700 font-poppins">Pratibimb Policies</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 font-poppins">
          {/* Refund and Cancellation Policy */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
            <h2 className="text-lg font-bold text-gray-700">Refunds and Cancellations</h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Pratibimb does not entertain any refunds or cancellations once a transaction is completed. Please review your order details carefully before proceeding with payments.
            </p>
          </div>

          {/* Compliance */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
            <h2 className="text-lg font-bold text-gray-700">Compliance</h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Users must adhere to applicable laws and regulations while using Pratibimb's platform. Misuse, fraudulent activities, or prohibited transactions as outlined by our guidelines are strictly forbidden and may result in legal actions.
            </p>
          </div>

          {/* Privacy and Data Security */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
            <h2 className="text-lg font-bold text-gray-700">Privacy and Data Security</h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Pratibimb values your privacy and follows stringent data protection measures. Any personal data collected during transactions is handled securely, ensuring it is not inappropriately accessed, disclosed, or misused.
            </p>
          </div>

          {/* Prohibited Transactions */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
            <h2 className="text-lg font-bold text-gray-700">Prohibited Transactions</h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Transactions involving restricted items or illegal activities are strictly prohibited. Any violations may result in immediate suspension and reporting to the relevant authorities.
            </p>
          </div>

          {/* Pratibimb Support */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
            <h2 className="text-lg font-bold text-gray-700">Need Help?</h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              For issues related to transactions or platform use, contact Pratibimb's support team at 
              <a
                href="mailto:clubpratibimb.sgsits@gmail.com"
                className="text-blue-500 hover:underline"
              >
                clubpratibimb.sgsits@gmail.com
              </a>.
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-10 text-center text-gray-500 text-xs md:text-sm">
        © {new Date().getFullYear()} Pratibimb. All rights reserved.
      </footer>
    </div>
  );
};

export default TermsAndConditions;
