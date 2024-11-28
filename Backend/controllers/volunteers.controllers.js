const db = require("../db/index.js");
const { sendEmailForVolunteering } = require("../utils/sendEmail.js");
const errorHandler = require("../utils/errorHandler.js");

const applyForVolunteering = async (req, res) => {
  try {
    const { name, phone, email, branch, batch, domain } = req.body;

    if (!email) {
      return res
        .status(400)
        .send(errorHandler(400, "Invalid Request", "Please enter the email"));
    }
    if (!name) {
      return res
        .status(400)
        .send(errorHandler(400, "Invalid Request", "Please enter the name"));
    }
    if (!phone) {
      return res
        .status(400)
        .send(errorHandler(400, "Invalid Request", "Please enter the phone"));
    }
    if (!branch) {
      return res
        .status(400)
        .send(errorHandler(400, "Invalid Request", "Please enter the branch"));
    }
    if (!batch) {
      return res
        .status(400)
        .send(errorHandler(400, "Invalid Request", "Please enter the batch"));
    }
    if (!domain) {
      return res
        .status(400)
        .send(errorHandler(400, "Invalid Request", "Please enter the domain"));
    }
    let data = {
      name,
      phone,
      branch,
      batch,
      domain,
    };
    let insertion = await db("volunteers").insert(data).returning("*");
    sendEmailForVolunteering(email, name);
    if (insertion) {
      return res.status(200).send({
        response: {
          data: insertion,
          title: "Form Submitted",
          message: "Form Submitted Successfully",
          status: 200,
        },
      });
    }
  } catch (error) {
    console.error("Error while applying for volunteers", error);
    return res
      .status(500)
      .send(
        errorHandler(
          500,
          "Internal Server Error",
          "Error in applying for volunteers"
        )
      );
  }
};

module.exports = {
  applyForVolunteering,
};
