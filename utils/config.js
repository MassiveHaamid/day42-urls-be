require("dotenv").config();

const URL = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const EMAIL_ADDRESS = process.env.MAILER_EMAIL;
const EMAIL_PASSWORD = process.env.MAILER_PASSWORD;
const SECRET = process.env.JWT_SECRET;
const BEURL = "https://urls-bae.onrender.com/"
const FEURL = "http://localhost:5173";

module.exports = {
  URL,
  PORT,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
  SECRET,
  FEURL,
  BEURL,
};