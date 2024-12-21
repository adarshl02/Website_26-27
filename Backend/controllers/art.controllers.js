const cloudinary = require("../config/cloudinary");
const db = require("../config/db");

const artCommunity = async (req, res) => {
  try {
    
    const { email, name, phone,description, instagram_user_id } = req.body;

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

module.exports = {
  artCommunity,
};
