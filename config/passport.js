const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = require('../models/User');



module.exports = function(passport){
    passport.use( //BY DEFAULT IT IS USES 'USERNAME AND PASSWORD'. MADE CHANGES BCZ I WANT EMAIL AS USERNAME
        new LocalStrategy({usernameField:'email'},(email, password, done)=>{
            User.findOne({email: email.toLocaleLowerCase()},(err, user)=>{
                if(err){
                    return done(err) //done is just like next function
                }
                if(!user){
                    return done(null, false,{ msg: `Email ${email} not found.`})
                }
                if(!user.password){ // WHEN YOU ARE USING THIRD PARTY SIGN IN LIKE GOOGLE OR FACEBOOK, YOU DIDNT GET THE PASSWORD FOR SECURITY REASONS, 
                    return done(null, false,{ 
                        msg: 'Your account was registered with sign- in provider'
                    })
                }
user.comparePassword(password, (err, isMatch)=>{ //comparing password
    if(err){
        return done(err);
    }
    if(isMatch){
        return done(null, user)// (failure, success)
    }
    return done(null, false, {msg: 'Invalid credentials'}) //if password not matched
})
            })
        })  
    )

//WHERE IN OUR SESSION WHAT WE ARE GOING TO STORE AND NOT GOING TO RESTORE, ITS DEPENDS ON SERIALIZE AND DESERIALIZE

passport.serializeUser((user, done)=>{
    done(null,  user.id); //null means no error
    //session will store the user.id
})

//if want to store decrypt manner

passport.deserializeUser((id, done)=>{
    User.findById(id, (err,user)=>{ done(err, user)}) //this will store teh whole user object
})

}
