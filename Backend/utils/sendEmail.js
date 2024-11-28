const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: "eklavyasinghparihar7875@gmail.com",
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendEmail = async (
  email,
  name,
  team_name,
  event_date,
  event_name,
  event_location,
  qrCodeFilePath
) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../templates/emailTemplate.html"
    );
    const emailTemplate = fs.readFileSync(templatePath, "utf-8");

    const emailContent = emailTemplate
      .replace("{{name}}", name)
      .replace("{{team_name}}", team_name)
      .replace("{{event_name}}", event_name)
      .replace("{{event_date}}", event_date)
      .replace("{{event_location}}", event_location);

    const mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: "Your Event Ticket",
      html: emailContent,
      attachments: [
        {
          filename: "qr_code.png",
          path: qrCodeFilePath,
          cid: "qrCodeImage",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendEmailForVolunteering = async (email, name) => {
  try {
    const mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: "Your Event Ticket",
      text: `Thanks ${name} For Applying To Become a Volunteer our team will reach out to you soon`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully for volunteers!");
  } catch (error) {
    console.error("Error sending email for volunteers:", error);
  }
};

module.exports = { sendEmail, sendEmailForVolunteering };
