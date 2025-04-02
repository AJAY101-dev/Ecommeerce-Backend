const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require('jsonwebtoken');
passport.use(
    new GoogleStrategy({
        clientID:"347516517353-goi9m91illo5gb07dslc1vl98rjsa72c.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done)=>{
        const user ={
            googleId:profile.id,
            name:profile.displayName,
            email:profile.emails[0].value,
            picture:profile.photos[0].value,
        };
        const token = jwt.sign(user, "jwtsecret", {expiresIn:"3h"});
        return done(null, {user, token})
    }
)
);
// passport.serializeUser((user, done)=>{
//     done(null, user);
// });
// passport.deserializeUser((user, done)=>{
//     done(null, user);
// })
module.exports = passport