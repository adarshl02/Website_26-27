const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: "clubpratibimb.sgsits@gmail.com",
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
  qrCodeBuffer
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
          content: qrCodeBuffer,
          cid: "qrCodeImage",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error in sending email:", error);
  }
};

const sendEmailForVolunteering = async (
  email,
  name,
  phone,
  domain,
  branch,
  batch
) => {
  try {
    let templatePath = path.join(
      __dirname,
      "../templates/volunteersTemplate.html"
    );
    let emailTemplate = fs.readFileSync(templatePath, "utf-8");
    emailTemplate = emailTemplate
      .replace("{{name}}", name)
      .replace("{{email}}", email)
      .replace("{{phone}}", phone)
      .replace("{{domain}}", domain)
      .replace("{{branch}}", branch)
      .replace("{{batch}}", batch);

    await transporter.sendMail({
      from: '"Club Pratibimb" <your-email@example.com>',
      to: email,
      subject: "Thank You for Volunteering!",
      html: emailTemplate,
    });

    console.log("Email sent to:", email);
  } catch (error) {
    console.error("Error sending email for volunteers:", error);
  }
};

module.exports = { sendEmail, sendEmailForVolunteering };