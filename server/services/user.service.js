const userModel = require('../models/user');

module.exports.CreateUser =  async({ 
     firstname , email , password
}) => {
    if(!firstname || !email || !password) {
        throw new Error('All field are required')
    }

    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    (await user).save();

    const token = generateAuthToken();

    res.status(201).json({
       success: true,
       message: 'User registered successfully'
    })
}