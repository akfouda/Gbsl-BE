const express = require("express");
const dotenV = require("dotenv");
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require("cors"); // Install with npm install cors
const dbConnection = require("./config/db"); // Corrected the import
const ApiError = require("./utils/apiErorr");
const globalError = require("./middlewares/errorMiddleware");
const categoryRoute = require("./api/categoryRoute");
const subCategoryRoute = require("./api/subCategoryRoute");
const shipmentRoute = require("./api/shipmetRoute");

// Load environment variables from config file
dotenV.config({ path: "congfig.env" });

// Initialize Express app
const app = express();
// eslint-disable-next-line no-use-before-define
app.use(cors({ origin: "*" }));
app.use(express.static("public"));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
dbConnection();

// Route for category APIs
app.use("/api/v1/category", categoryRoute); // Added categoryRoute to middleware stack
app.use("/api/v1/subcategory", subCategoryRoute); // Added categoryRoute to middleware stack
app.use("/api/v1/shipment", shipmentRoute); // Added categoryRoute to middleware stack

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
