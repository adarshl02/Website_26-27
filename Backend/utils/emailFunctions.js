const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "teampratibimb.sgsits@gmail.com",
    pass: "dmwklilobtttgksu",
  },
});

const sendEmail = async (
  email,
  name,
  team_name,
  event_date,
  event_name,
  event_location
  // qr_code
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
    // .replace("{{qr_code}}",qr_code)

    const mailOptions = {
      from: '"Club Pratibimb" <teampratibimb.sgsits@gmail.com>',
      to: email,
      subject: "Your Event Ticket",
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error in sending email:", error);
  }
};

const sendEmailForArtWork = async (user_name, email) => {
  try {
    let templatePath = path.join(
      __dirname,
      "../templates/notificationTemplate.html"
    );
    let emailTemplate = fs.readFileSync(templatePath, "utf-8");
    emailTemplate = emailTemplate.replace("{{user_name}}", user_name);

    await transporter.sendMail({
      from: '"Club Pratibimb" <team@clubpratibimb.com>',
      to: email,
      subject: "Welcome to Graffathon '25 - Going beyond Rituals",
      html: emailTemplate,
    });

    console.log("Email sent to:", email);
  } catch (error) {
    console.error("Error sending email for volunteers:", error);
  }
};
const sendWelcomeEmail = async (email, name) => {
  try {
    let templatePath = path.join(
      __dirname,
      "../templates/welcomeTemplate.html"
    );
    let emailTemplate = fs.readFileSync(templatePath, "utf-8");
    emailTemplate = emailTemplate.replace("{{name}}", name);

    await transporter.sendMail({
      from: '"Club Pratibimb" <team@clubpratibimb.com>',
      to: email,
      subject: "Pratibimb Welcomes You",
      html: emailTemplate,
    });

    console.log("Email sent to:", email);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

const sendEmailForArtist = async (email, name) => {
  try {
    let templatePath = path.join(__dirname, "../templates/artTemplate.html");
    let emailTemplate = fs.readFileSync(templatePath, "utf-8");
    emailTemplate = emailTemplate.replace("{{name}}", name);

    await transporter.sendMail({
      from: '"Club Pratibimb" <team@clubpratibimb.com>',
      to: email,
      subject: "Artwork Submission Confirmation - Club Pratibimb",
      html: emailTemplate,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

module.exports = {
  sendEmail,
  sendEmailForVolunteering,
  sendWelcomeEmail,
  sendEmailForArtist,
  sendEmailForArtWork
};
