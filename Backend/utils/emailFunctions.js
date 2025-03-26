import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "teampratibimb.sgsits@gmail.com",
    pass: process.env.NODEMAILER_PASSWORD_1
  },
});

const sendEmailForRecruitments = async (
  email,
  membership_number,
  member_name,
  batch,
  branch,
  qr_code
) => {
  try {
    const templatePath = path.join(
      process.cwd(),
      "templates/recruitmentsTemplate.html"
    );
    const emailTemplate = fs.readFileSync(templatePath, "utf-8");

    const emailContent = emailTemplate
      .replace("{{membership_number}}", membership_number)
      .replace("{{member_name}}", member_name)
      .replace("{{batch}}", batch)
      .replace("{{branch}}", branch)
      .replace("{{qr_code}}", qr_code);

    const mailOptions = {
      from: '"Club Pratibimb" <teampratibimb.sgsits@gmail.com>',
      to: email,
      subject: "You Membership Card",
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
    const templatePath = path.join(
      process.cwd(),
      "templates/notificationTemplate.html"
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
    const templatePath = path.join(
      process.cwd(),
      "templates/welcomeTemplate.html"
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
    const templatePath = path.join(process.cwd(), "templates/artTemplate.html");
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

export { sendEmailForRecruitments, sendWelcomeEmail, sendEmailForArtist, sendEmailForArtWork };
