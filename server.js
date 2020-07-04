const express = require("express"),
	session = require("express-session"),
	mongoose = require("mongoose"),
	MongoDBStore = require("connect-mongodb-session")(session),
	passport = require("./server/config/passport"),
	compression = require("compression"),
	{ join } = require("path"),
	cors = require("cors"),
	PORT = process.env.PORT || 3300,
	MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/employee-directory",
	prodEnv = process.env.NODE_ENV === "production";

mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then((conn) => {
		if (conn) console.log(`Connected to ${conn.connections[0].db.databaseName}`);
	})
	.catch(console.error);

const Store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: "user-sessions"
});
Store.on("error", (error) => console.log(error));

const app = express();
if (prodEnv) app.use(express.static(join(__dirname, "build")));
app.use(express.urlencoded({ extended: true }))
	.use(express.json())
	// Session middleware
	.use(cors({ credentials: true, origin: "http://localhost:3000" }))
	.use(
		session({
			secret: process.env.SESS_SECRET || "deku",
			resave: false,
			saveUninitialized: true,
			store: Store,
			cookie: {
				sameSite: true,
				httpOnly: true,
				secure: false
			}
		})
	)
	.use(passport.initialize())
	.use(passport.session())
	.use(compression());
// Set routes
require("./server/routes/book-router")(app);
require("./server/routes/user-router")(app);
if (prodEnv)
	app.get("*", (req, res) => {
		res.sendFile(join(__dirname, "build/index.html"));
	});
app.listen(PORT, (err) => {
	if (err) throw err;
	else console.log(`Listening on port ${PORT}`);
});
