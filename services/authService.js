exports.generateRandomToken = (length = 8) => {
  const token = crypto.randomBytes(length).toString('hex');
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + 1); // Set expiry to 1 hour from now
  return { token, expiry };
};
