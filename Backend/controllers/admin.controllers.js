const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db/index.js");
const { errorHandler } = require("../utils/errorHandler");
require('dotenv').config()

const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(404)
        .send(
          errorHandler(
            404,
            "Invalid Request",
            "Please Enter Username And Password"
          )
        );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db("admins").insert({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(404)
        .send(errorHandler(404, "Already Exists", "Username Already Exists"));
    } else {
      return res
        .status(500)
        .json(
          errorHandler(
            500,
            "Internal Server Error",
            "Server Error While Creating Admins"
          )
        );
    }
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await db('admins').where({ username }).first();
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }


}

module.exports = {
  registerAdmin,
  loginAdmin
}
