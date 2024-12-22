const cloudinary = require("../config/cloudinary");
const db = require("../config/db");
const { sendEmailForArtist } = require("../utils/emailFunctions.js");
const { errorHandler } = require("../utils/errorHandler");

const artCommunity = async (req, res) => {
  try {
    console.log(req.body);

    const { email, name, phone, description, instagram_user_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    if (!email || !name || !phone || !instagram_user_id) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const lastUpload = await db("art_community")
      .where("email", email)
      .orWhere("instagram_user_id", instagram_user_id)
      .orderBy("created_at", "desc")
      .first();

    if (lastUpload) {
      const lastUploadDate = new Date(lastUpload.created_at);
      const currentDate = new Date();

      const diffInDays = (currentDate - lastUploadDate) / (1000 * 60 * 60 * 24);
      if (diffInDays < 7) {
        return res.status(400).json({
          error: `You can upload a new photo after ${
            7 - Math.floor(diffInDays)
          } day(s).`,
        });
      }
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "Pratibimb" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const { secure_url } = result;

    const insertedData = await db("art_community")
      .insert({
        image_url: secure_url,
        email,
        name,
        phone,
        description,
        instagram_user_id,
      })
      .returning("*");

    await sendEmailForArtist(email, name);

    return res.status(200).json({
      message: "Image and details uploaded successfully",
      data: insertedData,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

const imAnArtist = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .send(errorHandler(400, "Invalid Request", "Please Enter the Email"));
    }
    let data = {
      is_artist: true,
    };
    let updation = await db("users").update(data).where({
      email,
    });
    if (!updation) {
      return res
        .status(400)
        .send(
          errorHandler(
            400,
            "Some Error Occurred",
            "Some Error Occurred While Enrolling Artist"
          )
        );
    }
    return res.status(200).send({
      response: {
        data: { updation },
        title: "Enrolled Successfully",
        message: "Artist Enrolled Succesfully",
      },
    });
  } catch (error) {
    console.error("Event Ticket Error", error);
    res.status(500).json({ message: "Error In Enrolling Artist", error });
  }
};

const getUserAndArtCommunityDetails = async (req, res) => {
  try {
    const data = await db("users")
      .join("art_community", "users.email", "art_community.email")
      .select(
        "users.avatar",
        "art_community.email",
        "art_community.instagram_user_id"
      );
    return res.status(200).send({
      response: {
        data: { data },
        title: "Fetched Successfully",
        message: "Data Fetched Sucessfully",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

const countArtist = async (req, res) => {
  try {
    const count = await db("users")
      .where({ is_artist: true })
      .count("id as total");

    res.status(200).json({
      success: true,
      count: count[0].total,
      message: "Number of artists fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching artist count:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  artCommunity,
  imAnArtist,
  getUserAndArtCommunityDetails,
  countArtist,
};
