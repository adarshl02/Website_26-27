const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com', // Microsoft 365 SMTP server
  port: 587, // TLS port
  secure: false, // Use TLS (true for 465, false for other ports)
  auth: {
    user: 'team@clubpratibimb.com', // Your Microsoft 365 email address
    pass: process.env.NODEMAILER_PASSWORD, // Your app password stored in an environment variable
  },
  tls: {
    ciphers: 'SSLv3'
  }
});


const emailArray = [
  "email1@example.com",
  "email2@example.com",
  "email3@example.com",
];

const mailOptions = {
  from: '"Club Pratibimb" <team@clubpratibimb.com>',
  subject: "Test Email",
  text: "This is a test email sent to multiple recipients.",
};

async function sendEmails(emailList) {
  for (const recipient of emailList) {
    try {
      const mailDetails = { ...mailOptions, to: recipient };
      const info = await transporter.sendMail(mailDetails);
      console.log(`Email sent to ${recipient}: ${info.response}`);
    } catch (error) {
      console.error(`Failed to send email to ${recipient}:`, error);
    }
  }
}

sendEmails(emailArray);
