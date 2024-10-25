const nodemailer = require("nodemailer");
const db = require("../db/index.js");
const fs = require("fs");
const path = require("path");
require("dotenv");

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: "eklavyasinghparihar7875@gmail.com", // Your email
    pass: "ybhbhroqrjesdelc", // Your email password
  },
});

const sendEventNotificationEmail = async (recipientEmail, eventDetails) => {
  const templatePath = path.join(
    __dirname,
    "../templates/notificationTemplate.html"
  );
  const emailTemplate = fs.readFileSync(templatePath, "utf-8");
  const mailOptions = {
    from: "your-email@gmail.com",
    to: recipientEmail,
    subject: "Sepia:A Whirl Of Visuals",
    html: emailTemplate,
  };

  return transporter.sendMail(mailOptions);
};

const sendNotificationsToAllUsers = async (eventDetails) => {
  try {
    const users = await db("users").select("email");

    for (let user of users) {
      await sendEventNotificationEmail(user.email, eventDetails);
      console.log(`Notification sent to ${user.email}`);
    }

    console.log("All notifications sent successfully!");
  } catch (error) {
    console.error("Error while sending notifications:", error);
  }
};

const eventDetails = {
  title: "Tech Conference 2024",
  date: "2024-11-10",
  description: "A conference on the latest technology trends.",
};

sendNotificationsToAllUsers(eventDetails);
