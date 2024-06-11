const path = require('path');

const express = require("express");
const dotenV = require("dotenv");
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require("cors"); // Install with npm install cors
const dbConnection = require("./config/db"); // Corrected the import
const ApiError = require("./utils/apiErorr");
const globalError = require("./middlewares/errorMiddleware");
const shipmentRoute = require("./api/shipmetRoute");
const userRoute = require("./api/userRoute");
const authRoute = require("./api/authRoute");

// Load environment variables from config file
dotenV.config({ path: "congfig.env" });

// Initialize Express app
const app = express();
// eslint-disable-next-line no-use-before-define
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.static("public"));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// Connect to the database
dbConnection();

// Route for category APIs
app.use("/api/v1/shipment", shipmentRoute); // Added categoryRoute to middleware stack
app.use("/api/v1/user", userRoute); // Added categoryRoute to middleware stack
app.use("/api/v1/auth", authRoute); // Added categoryRoute to middleware stack

// Middleware to handle undefined routes
app.all("*", (req, res, next) => {
  next(new ApiError("Route Not Found", 404)); // Corrected the status code
});

// Error handling middleware
app.use(globalError);

// Define the port number
const port = process.env.PORT || 8080;

// Start the server
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err} | ${err.message}`);

  // Gracefully shut down the server
  server.close(() => {
    console.error("Server shut down due to unhandled rejection");
    process.exit(1);
  });
});
