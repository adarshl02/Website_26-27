const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail", // Use your own email service
    auth: {
      user: "clubpratibimb.sgsits@gmail.com",
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

const emailArray = [
  "email1@example.com",
  "email2@example.com",
  "email3@example.com",
];

const mailOptions = {
  from: "your-email@example.com",
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
