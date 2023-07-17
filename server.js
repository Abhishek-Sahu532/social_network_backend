const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const logger = require('morgan')
const connectDB = require('./config/database');
const session = require('express-session') // it will store the session
const MongoStore = require('connect-mongo') // it will store the session inthe mongo db
require('dotenv').config({path: './config/.env'}) //THIS IS HOW YOU CAN CHANGE THE PATH FOR THE ENV FILE
require('./config/passport')(passport)
connectDB();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use(logger('dev'));
app.use(passport.initialize())
app.use(password.session())

//THROUGH THE MONGOOSE IT WILL STORE THE SESSION IN MONGO DB
app.use(
    session({
        secret:'secret',
        resave: false,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    })
)


app.listen(process.env.PORT, ()=>{
    console.log('App is connected')
})