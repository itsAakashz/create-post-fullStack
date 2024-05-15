const express = require("express");
const { connect } = require('./db/connectionMongoDb');
const userRoutes = require("./routes/userRoutes");
const cors =require("cors")



// Create an Express app
const app = express();
const port = process.env.PORT || 80;


// Custom CORS configuration
const corsOptions = {
  origin: 'https://create-post-full-stack.vercel.app/', // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// Use CORS with custom options
app.use(cors(corsOptions));

// Use JSON middleware
app.use(express.json());

//using imported mongo coonection route 
(async () => {
    await connect();
})();

//using imported rotes here
app.use(userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
