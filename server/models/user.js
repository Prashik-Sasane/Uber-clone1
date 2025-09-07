const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
     fullname : {
        firstname: {
          type: String,
          require: true,
          lowercase: true,
          trim: true,
          minlength: 3,
          maxlength: 50,
        }
        
     },
      email: {
         type: String,
         unique: true,
         lowercase: true,
         trim: true,
         required: true,
         match: [/^\S+@\S+\.\S+\S+$/ , 'Please enter a valid email address']
      },

      password: {
         type: String,
         require: true,
         minlength: 6,
         select: false
      }

})

userSchema.methods.generateAuthToken = function(){
   const token = jwt.sign({ _id: this._id } , process.env.JWT_SECRET)
   return token;
}
userSchema.methods.comparePassword = async function(password){
   return await bcrypt.compare(password , this.password)
}
userSchema.statics.hashPassword = async function(password) {
   return await bcrypt.hash(password , 10);
}

const userModel = mongoose.model('user' , userSchema)
module.exports = userModel
