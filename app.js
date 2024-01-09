const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const urlRouter = require('./routes/urlRoutes');
const { URL } = require("./utils/config");
const { log, error } = require("./utils/logger");

const app = express();

// set the strictQuery option to false to allow for querying by id
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose
  .connect(URL)
  .then(() => {
    log("connected to mongoDB");
  })
  .catch((err) => {
    error(err);
  });

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/user/url', urlRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.use(cors({
//   origin: 'http://example.com', // Replace with your allowed origin
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Enable credentials (if needed)
// }));