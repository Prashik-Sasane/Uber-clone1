const express = require('express');
const userRouter = require('./routes/user.routes')
const dotenv = require('dotenv');
const connectToDB = require('./db/db')
const cookieParser = require('cookie-parser');
const cors = require('cors');
connectToDB();
dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use( express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())
app.use('/user' , userRouter)

const PORT = 3000 || process.env.PORT; 

app.listen(PORT , () => {
    console.log(`server is running on ${PORT}`);
})