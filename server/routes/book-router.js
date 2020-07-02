const { User, Book } = require("../models/");
const flash = require("../config/middleware/flash");
const { ObjectId } = require("mongoose").Types;
const serverErr = (res) => res.status(500).json(flash("Internal server error.", "error")).end();
const { getBooks } = require("../config/middleware/googleAPI");
/**
 * Handles book API calls
 * @param {import("express").Router} router
 */
module.exports = (router) => {
	router.get("/api/books/:search", async (req, res) => {
		try {
			console.log(req.params.search);
			let books = await getBooks(req.params.search);
			res.json(books.data).end();
		} catch (error) {
			console.error(error);
			serverErr(res);
		}
	});
	router.get("/api/my-books", async (req, res) => {
		try {
			let books = await User.findOne({ _id: ObjectId(req.user._id) }).populate("Book");
			res.json(books).end();
		} catch (error) {
			console.error(error);
			serverErr(res);
		}
	});
};
