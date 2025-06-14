import React, { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
       <button  className="fixed z-50 top-14 left-2 md:top-6 md:left-10" onClick={() => navigate('/')}>
      <div  ><ArrowBackIcon/></div>
      </button>
      <header className="mb-8 text-center mt-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy for Pratibimb</h1>
        <p className="text-gray-600">Last Updated: June 10, 2025</p>
      </header>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Pratibimb ("we," "our," or "us"), operated by Team Pratibimb at SGSITS, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Pratibimb application and services.
          </p>
          <p>
            By using Pratibimb, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
          <p className="mb-4">The Pratibimb application may collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, contact details when you register for Pratibimb services</li>
            <li><strong>Usage Data:</strong> Information about how you interact with the Pratibimb application</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information for analytics and security</li>
            <li><strong>Google User Data:</strong> Only with your explicit consent through Google OAuth for authentication purposes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Google OAuth Data Handling</h2>
          <p className="mb-4">
            Pratibimb uses Google OAuth API for user authentication. When you sign in to Pratibimb using Google, we request the following permissions:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Basic Profile Information:</strong> Your name, email address, and profile picture to personalize your Pratibimb account</li>
            <li><strong>Authentication:</strong> To verify your identity and secure your Pratibimb account</li>
          </ul>
          <p className="mb-4">
            Pratibimb will:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Only use this data for the explicit purposes stated in this policy</li>
            <li>Not transfer, sell, or share this data with third parties without your explicit consent</li>
            <li>Store this data only as long as necessary to provide Pratibimb services</li>
            <li>Implement industry-standard security measures to protect your data</li>
          </ul>
          <p>
            You can revoke Pratibimb's access to your Google data at any time through your <a href="https://myaccount.google.com/permissions" className="text-blue-600 hover:underline">Google Account Settings</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. How We Use Your Information</h2>
          <p className="mb-4">Pratibimb uses the collected information for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To provide and maintain the Pratibimb service</li>
            <li>To authenticate users through Google OAuth</li>
            <li>To personalize your experience with Pratibimb</li>
            <li>To notify you about changes to Pratibimb services</li>
            <li>To provide customer support for Pratibimb users</li>
            <li>To monitor and improve Pratibimb application performance</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
          <p className="mb-4">
            Pratibimb implements appropriate security measures to protect your personal data, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Encryption of sensitive data</li>
            <li>Regular security audits</li>
            <li>Access controls to personal information</li>
          </ul>
          <p>
            While we strive to protect your data, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

       
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Retention & Account Deletion</h2>
          <p className="mb-4">
            Pratibimb retains your personal data only as long as necessary to provide our services. You may request account deletion at any time:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Self-Service Deletion:</strong> 
              Visit <a href="https://clubpratibimb.com/delete-account" className="text-blue-600 hover:underline">our account deletion page</a> to initiate the process.
            </li>
            <li>
              <strong>Manual Request:</strong> 
              Email us at teampratibimb.sgsits@gmail.com with subject "Account Deletion Request".
            </li>
          </ul>
          <p className="mb-4">
            Upon deletion request, Pratibimb will:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Permanently erase your personal data within 30 days</li>
            <li>Retain anonymized transaction records for legal compliance</li>
            <li>Revoke all third-party access (including Google OAuth)</li>
          </ul>
          <p>
            For full details, please review our <a href="https://clubpratibimb.com/delete-account" className="text-blue-600 hover:underline">Account Deletion Policy</a>.
          </p>
        </section>


        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or Pratibimb's data practices, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>By email: teampratibimb.sgsits@gmail.com</li>
            <li>Through our website: <a href="https://clubpratibimb.com/contact-us" className="text-blue-600 hover:underline">https://clubpratibimb.com/contact-us</a></li>
            <li>Mailing Address: [Your Physical Address, if required for compliance]</li>
          </ul>
        </section>
      </div>
    </div>
  );
}