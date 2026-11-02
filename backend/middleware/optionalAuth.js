import passport from "passport";

export default function optionalAuth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) req.user = user;
    next();
  })(req, res, next);
}
