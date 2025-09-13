const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const CaptainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+\S+$/ , 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    age: {
        type: Number,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
        min: 0,
    },
    rank: {
        type: String,
        required: true,
    },
    vehicle: {
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
            unique: true,
        },
        model: {
            type: String,
            required: true,
        },
        vechicleType: {
            type: String,
            enum: ['car', 'bike', 'auto'],
        },
    },
    missionsCompleted: {
        type: Number,
        default: 0,
        min: 0,
    },
}, { timestamps: true });

CaptainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
         { _id: this._id },
          process.env.JWT_SECRET
    );
    return token;
}

CaptainSchema.method.comparePassword = async function(password) {
    return await method.compare(password , this.password);
}

CaptainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password , 10);
}

module.exports = mongoose.model('Captain', CaptainSchema);