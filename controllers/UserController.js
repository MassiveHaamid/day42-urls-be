// create a user router
const User = require('../models/usersModel.js');
const authService = require('../services/authService.js');
const emailService = require('../services/emailService.js');

// Forget Password
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a random token and set it in the user's record
    const resetToken = authService.generateRandomToken();
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token expiry in 1 hour
    await user.save();

    // Send email with the reset link
    emailService.sendResetPasswordEmail(user.email, resetToken);

    res.json({ message: 'Password reset email sent successfully. Check your inbox.' });
  } catch (error) {
    console.error('Error in forgetPassword:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Update password and clear resetToken
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};