const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user.js");

const opts = {
	jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey:'secret'
}
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        //jwt_payload用户信息列表
        User.findById(jwt_payload.id)
            .then((user) => {
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch((err) => console.log(err));
    }));
}