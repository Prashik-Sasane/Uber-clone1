const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.CreateUser =  async({ 
      email , password
}) => {
    if(!firstname || !email || !password) {
        throw new Error('All field are required')
    }
    const user = await userModel.create({
        email,
        password
    });

   return user;
}