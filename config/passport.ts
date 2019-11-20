const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user.ts");

const opts = {
	jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey:'secret'
}
module.exports = (passport:any) => {
    passport.use(new JwtStrategy(opts, (jwt_payload:any, done:any) => {
        //jwt_payload用户信息列表
        User.findById(jwt_payload.id)
            .then((user:any) => {
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch((err:any) => console.log(err));
    }));
}