import cloudinary from "../config/cloudinary/index.js";
import db from "../config/db/index.js"
import {sendEmailForArtist } from "../utils/emailFunctions.js";
import errorHandler from "../utils/errorHandler.js";

const artCommunity = async (req, res) => {
  try {
   
    const { email, name, phone, description, instagram_user_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    
    if (!email || !name || !phone || !instagram_user_id) {
      return res.status(400).json({ error: "All fields are required" });
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

    const existingUser = await db("users").where({ email }).first();
    
    if (!existingUser.is_artist) {
      await db("users").update({ is_artist: true }).where({ email });
    }

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
        "art_community.name",
        "art_community.instagram_user_id"
      ).limit(10);
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
    const result = await db("users")
      .where({ is_artist: true })
      .count("id as count");
    const artistCount = result[0].count;

    return res.status(200).send({
      response: {
        data: artistCount,
        title: "Successfully Fetched",
        message: "Artists Successfully Fetched",
        status: 200,
      },
    });
  } catch (error) {
    console.error("Error fetching artist count:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve artist count",
      error: error.message,
    });
  }
};


export {
  artCommunity,
  imAnArtist,
  getUserAndArtCommunityDetails,
  countArtist,
};
