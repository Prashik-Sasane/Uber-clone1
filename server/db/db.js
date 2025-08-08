const dotenv = require("dotenv")
dotenv.config()

const mongoose = require('mongoose')
console.log("process.env.DB_CONNECT",process.env.DB_CONNECT)
function connectToDB(){
    mongoose.connect(process.env.DB_CONNECT , {
        useUnifiedTopology: true
    }).then( ()=> {
        console.log('Connected to DB')
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });
}

module.exports = connectToDB;
