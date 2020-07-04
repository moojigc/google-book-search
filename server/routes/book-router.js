const { User, Book } = require("../models/"),
	{ ObjectId } = require("mongoose").Types,
	flash = require("../config/middleware/flash"),
	serverErr = (res) => res.status(500).json(flash("Internal server error.", "error")).end(),
	{ getBooks } = require("../config/middleware/googleAPI");
/**
 * Handles book API calls
 * @param {import("express").Router} router
 */
module.exports = (router) => {
	router.get("/api/books/search/:search", async (req, res) => {
		try {
			console.dir(req.params.search);
			let books = await getBooks(req.params.search);
			res.json(books.data).end();
		} catch (error) {
			console.error(error);
			serverErr(res);
		}
	});
	router.get("/api/books/saved", async (req, res) => {
		try {
			let books = await User.findOne({ _id: ObjectId(req.user._id) }).populate("Book");
			res.json(books).end();
		} catch (error) {
			console.error(error);
			serverErr(res);
		}
	});
	router.put("/api/books/save", async ({ body }, res) => {
		try {
			if (body.books.length > 1) {
				let books = await Book.insertMany(body.books);
				let userInventory = await User.updateOne(
					{ _id: req.user._id },
					{
						$push: {
							books: books.map((book) => book._id)
						}
					}
				);
				if (books && userInventory)
					res.json(
						flash(`Saved ${body.books.length} books to your collection!`, "success")
					).end();
			} else {
				let book = await Book.create(body);
				let userInventory = await User.updateOne(
					{ _id: req.user._id },
					{
						$push: {
							books: book._id
						}
					}
				);
				if (book && userInventory)
					res.json(flash(`Saved ${body.title} to your collection!`, "success")).end();
			}
		} catch (error) {
			console.error(error);
			serverErr(res);
		}
	});
};
