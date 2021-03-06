const { User } = require("../models/");
const passport = require("../config/passport");
/**
 *
 * @param {string} message
 * @param {"error" | "success"} type
 */
const flash = (message, type) => {
	return {
		flash: {
			message: message,
			type: type
		}
	};
};
const serverError = (res) => res.json(flash("Internal server error.", "error")).end();
const guestUser = {
	_id: null,
	username: "Guest",
	auth: false
};

/**
 * Handles user login, status, registration, etc.
 * @param {import("express").Router} router
 */
module.exports = (router) => {
	router.post("/api/register", async ({ body }, res) => {
		console.log(body);
		const isInvalid =
			Object.values(body).filter((field) => field === null || field === "").length > 0;
		if (isInvalid) {
			res.json({
				...flash("Missing fields.", "error"),
				redirect: "/register"
			});
			return;
		} else if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(body.email)) {
			res.json({
				...flash("Not a valid email.", "error"),
				redirect: "/register"
			});
			return;
		} else if (body.password !== body.password2) {
			res.json({ ...flash("Passwords must match!", "error"), redirect: "/register" });
		} else {
			let user = new User({
				username: body.username,
				email: body.email,
				password: body.password
			});
			try {
				await user.encryptPass();
				await User.create(user.toObject());
				res.status(200).json({
					...flash(`Welcome, ${body.username}!`, "success"),
					redirect: "/login"
				});
			} catch (error) {
				let fields = error.keyValue ? Object.keys(error.keyValue) : null;
				let field = fields.length > 0 ? fields[0] : null;
				field
					? res.json({
							...flash(
								`${
									field.charAt(0).toUpperCase() + field.substring(1)
								} already taken.`,
								"error"
							),
							success: false,
							redirect: "/register"
					  })
					: serverError(res);
			}
		}
	});
	router.post("/api/login", (req, res, next) => {
		if (!req.body.usernameOrEmail || !req.body.password)
			return res.json({
				...flash("Missing fields.", "error"),
				user: guestUser
			});
		req.session.cookie.maxAge = req.body.rememberMe
			? 60000 * 60 * 24 * 7 * 26
			: 60000 * 60 * 24;
		passport.authenticate("local", function (err, user, info) {
			if (err) {
				return res.json({
					...flash(err, "error"),
					user: {
						auth: false
					},
					redirect: "/login"
				});
			}
			if (!user) {
				return res.json({
					...flash("User not found.", "error"),
					user: guestUser,
					redirect: "/login"
				});
			}
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}
				return res.json({
					user: {
						_id: user._id,
						username: user.username,
						auth: true
					},
					...flash(`Welcome, ${user.username}!`, "success"),
					redirect: "/"
				});
			});
		})(req, res, next);
	});
	router.get("/api/user-status", (req, res) => {
		switch (!!req.user) {
			case true:
				res.status(200).json(req.user).end();
				break;
			default:
			case false:
				res.json({
					_id: null,
					username: "Guest",
					auth: false
				}).end();
				break;
		}
	});
	router.get("/api/logout", (req, res) => {
		req.logout();
		res.json({
			user: {
				username: "Guest",
				auth: false
			},
			...flash("Logged out.", "success"),
			redirect: "/login"
		});
	});
};
