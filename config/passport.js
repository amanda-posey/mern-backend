require ('dotenv').config();
const { Strategy, ExtractJwt } = require('passport-jwt');

// model
const { User } = require('../models');

// object mode of strategy
const options = {
    jwtFromRequest: ExtractJwt.fromHeaderAsBearerToken(),
    secretOrKey: process.env.JW_SECRET
}

const JWT_STRATEGY = new Strategy(options, async (jwtPayload, done) => {
    // Check for user by id
    try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    } catch(error) {
        console.log('Error in passport config');
        console.log(error);
    }
});

// export function that will use strategy
module.exports = async (passport) => {
    passport.use(JWT_STRATEGY);
}