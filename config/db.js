const mongoose = require('mongoose');

/**
 * Function to establish connection with MongoDB database.
 */
const dbConnection = () => {
    mongoose.connect(process.env.DB_URI)
        .then(() => {
            console.log('Connected to the database');
        })
  
};

module.exports = dbConnection;


