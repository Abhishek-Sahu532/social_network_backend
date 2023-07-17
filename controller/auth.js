const passport = require('passport');
const validator = require('validator') //for email, password validation
const User = require('../models/User')


exports.login =(req,res, next)=>{
    const validationErrors =[] //will store all the array which occured
    if(!validator.isEmail(  req.body.email)){
        validationErrors.push({msg: 'Enter valid Email'})
    }
    if(validator.isEmpty(req.body.password)){ //check if password field is empty
        validationErrors.push({ msg: 'Enter valid password'})
    }

    if(validationErrors.length> 0){
        return res.redict('/login'); //IF ANY ERROR OCCURED, REDIRECT TO LOGIN PAGE
    }

    req.body.email = validator.normalizeEmail(re.body.email,{
        //this function will normalize the email to use after, and delete all the dots/whitespace between the email id and convert it into the lower case
        gmail_remove_dots: true
    });

    //to login
    passport.authenticate('local',(err, user, infor)=>{
        //will call the password.use function
        if(err){
            return next(err)
        }
        if(!user){
            return res.redirect('/login') //redirect if user entered the wrong credentials
        }
        req.logIn(user, (err)=>{
            if(err){
                return next(err)
            }
            res.redirect(req.session.returnTo || '/profile') //redirect if the user entered the right credentials
        })
    })(req,res,next)
}



exports.logout =(req,res)=>{
    req.logout();// simply calls the log out the function it will logout the user

    //if you want to print something
    // req.logout(()=>{
    //     console.log('User Logout')
    // })

    //destroy the session
    req.session.destroy() //it deletes the row in mongodb, which storing the user.id
    req.session.destroy((err)=>{
        req.user = null;
        res.redirect('/home') //when the user log out the, redirected to the home

    })   
}



exports.signUp = (req,res, next)=>{
    //some validation using validator for password character ,length and all
    req.body.email = validator.normalizeEmail(req.body.email,{
        gmail_remove_dots: true
    })
 
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password // instead of saving the original passowrd , will change with the bcrypt
    });

    User.save((err)=>{
        req.login(user,(err)=>{
            res.redirect('/profile') // if user successfully sing up , redirect to teh profile section
        })
    }); // saved in the database
    
}
