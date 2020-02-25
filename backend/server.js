//Import Libraries
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Tap onto environment file
require('dotenv').config();

//Create express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware and pass Json
app.use(cors());
app.use(express.json());

//Connect to Mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

//Notify connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established");
})

//Link to files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//Use the files with routing
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//Starts server
app.listen(port, () => {
    console.log('Server is running on port : 5000');
});

