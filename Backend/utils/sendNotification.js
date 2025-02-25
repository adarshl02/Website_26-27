import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "teampratibimb.sgsits@gmail.com",
    pass: "dmwklilobtttgksu",
  },
});

export const sendEventNotificationEmail = async (recipientEmail) => {
  try {
    const templatePath = path.join(__dirname, "../templates/welcomeTemplate.html");
    const emailTemplate = fs.readFileSync(templatePath, "utf-8");

    const mailOptions = {
      from: '"Club Pratibimb" <team@clubpratibimb.com>',
      to: recipientEmail,
      subject: "Welcome Message",
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification sent to ${recipientEmail}`);
  } catch (error) {
    console.error(`Failed to send email to ${recipientEmail}:`, error.message);
  }
};

export const sendNotificationsToAllUsers = async (userEmails) => {
  console.log("Sending notifications...");

  const emailPromises = userEmails.map(email => sendEventNotificationEmail(email));

  await Promise.all(emailPromises);

  console.log("All notifications sent successfully!");
};

// Example usage:
const userEmails_1 = [
  "adarshl10604@gmail.com",
  "eklavyasinghparihar7875@gmail.com"
];

sendNotificationsToAllUsers(userEmails_1);
