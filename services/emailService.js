// use a library like nodemailer to send emails
// Example: nodemailer setup and email sending logic
const nodemailer = require('nodemailer');
const config = require('../utils/config');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'reshma9298h@gmail.com',
    pass: 'lxmxebyedbeydxva',
  },
});

exports.sendResetPasswordEmail = (email, resetToken) => {
  const mailOptions = {
    from: 'reshma9298h@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${config.clientURL}/reset-password/${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

exports.generateRandomToken = () => {
  return crypto.randomBytes(16).toString('hex');
};