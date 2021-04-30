
const passport = require('passport');
const passportGoogle = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new passportGoogle(
{
   clientID:'515486895625-19rlv56tntau4i71o3kdsus60jr1hare.apps.googleusercontent.com',
   clientSecret:'rtc40iDjX6SxSBfyrJcRep6R',
   callbackURL:'http://localhost:8000/users/auth/google/callback' 
},

function(accessToken,refreshToken,profile,done){
   User.findOne({email:profile.emails[0].value}).exec(function(err,user){
         if(err){console.log("error in passport google auth, err"); return;}
         console.log(profile);
         console.log(accessToken, refreshToken);
         if(user){
             return done(null,user);
         }
         else{
             User.create({
                 name:profile.displayName,
                 email:profile.emails[0].value,
                 passport:crypto.randomBytes(20).toString('hex')
             });            
        }
   },function(err,user){
    if(err){console.log("error in passport google auth in creating user, err"); return;}
   });    

}

));