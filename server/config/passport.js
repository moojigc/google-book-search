const passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy,
	{ User } = require("../models"),
	bcrypt = require("bcryptjs");

passport.use(
	new LocalStrategy(
		{ usernameField: "usernameOrEmail" },
		async (usernameOrEmail, password, next) => {
			let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
			let searchParams = emailRegex.test(usernameOrEmail)
				? { email: usernameOrEmail }
				: { username: usernameOrEmail };
			let user = await User.findOne(searchParams);
			if (!user) return next(null, false);
			else {
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err;
					if (isMatch) {
						return next(null, user);
					} else {
						return next({ message: "Incorrect password." }, false);
					}
				});
			}
		}
	)
);
passport.serializeUser((user, next) => {
	next(null, { _id: user._id, username: user.username, auth: true });
});
passport.deserializeUser((obj, next) => {
	next(null, obj);
});

module.exports = passport;
