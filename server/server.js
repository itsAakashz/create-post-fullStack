const express = require("express");
const { connect } = require('./db/connectionMongoDb');
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

// Create an Express app
const app = express();
const port = process.env.PORT || 80;

// Custom CORS configuration
const corsOptions = {
  origin: 'https://create-post-full-stack-ws4c.vercel.app', // Ensure no trailing slash
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// Use CORS with custom options
app.use(cors(corsOptions));

// Use JSON middleware
app.use(express.json());

//using imported mongo connection route 
(async () => {
    await connect();
})();

//using imported routes here
app.use(userRoutes);

// Middleware to check CORS headers (for debugging purposes)
app.use((req, res, next) => {
  console.log('CORS headers:', res.get('Access-Control-Allow-Origin'));
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
