// require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_');

// acquire the connection to check if it is successfull
const db= mongoose.connection;

// error
db.on('error',console.error.bind(console, 'error connecting the db'));

//up and running then print the message
db.once('open', function(){
    console.log('Successfully connected to the database');
})