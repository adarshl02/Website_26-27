const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail", // or your email service, e.g., 'outlook', 'yahoo'
  auth: {
    user: "teampratibimb.sgsits@gmail.com", // your email address
    pass: "dmwklilobtttgksu", // your email password (or app-specific password)
  },
});

const sendEventNotificationEmail = async (recipientEmail) => {
  const templatePath = path.join(
    __dirname,
    "../templates/welcomeTemplate.html"
  );
  const emailTemplate = fs.readFileSync(templatePath, "utf-8");

  const mailOptions = {
    from: '"Club Pratibimb" <team@clubpratibimb.com>',
    to: recipientEmail,
    subject: "Welcome Message",
    html: emailTemplate,
  };

  return transporter.sendMail(mailOptions);
};

const sendNotificationsToAllUsers = async (userEmails, eventDetails) => {
  try {
    for (let email of userEmails) {
      await sendEventNotificationEmail(email, eventDetails);
      console.log(`Notification sent to ${email}`);
    }

    console.log("All notifications sent successfully!");
  } catch (error) {
    console.error("Error while sending notifications:", error);
  }
};
let userEmails = [
  "eklavyasinghparihar@gmail.com",
  "eklavyasinghparihar7875@gmail.com",
  "clubpratibimb.sgsits@gmail.com",
  "adarsh.landge10604@gmail.com",
  "mohitwadhwani8033@gmail.com",
  "mohitwadhwani187@gmail.com",
  "harshitajaiswal1704005@gmail.com",
  "harshita.23bce11331@vitbhopal.ac.in",
  "eklavya.7875@gmail.com",
  "mudittandon202005@gmail.com",
  "viditmaheshwari435@gmail.com",
  "jaybaghel7005@gmail.com",
  "jvsingh7005@gmail.com",
  "eklavya.indhanpay@gmail.com"
];
let userEmails_1 = [
"adarshl10604@gmail.com",
"eklavyasinghparihar7875@gmail.com"
];
sendNotificationsToAllUsers(userEmails_1);
