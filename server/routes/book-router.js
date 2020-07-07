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
	router.put("/api/books/save", async ({ body, user }, res) => {
		console.log(body, user);
		try {
			let book = await Book.findOneAndUpdate(
				{ googleId: body.googleId, user: ObjectId(user._id) },
				{
					...body,
					user: user._id
				},
				{
					new: true,
					upsert: true,
					rawResult: true
				}
			);
			console.log(book);
			if (!book.lastErrorObject.updatedExisting) {
				let userInventory = await User.updateOne(
					{ _id: ObjectId(user._id) },
					{
						$push: {
							books: book.value._id
						}
					}
				);
				if (book && userInventory)
					res.json({
						...flash(`Saved ${body.title} to your collection!`, "success"),
						saved: true
					}).end();
			} else {
				res.json({ ...flash("Book already saved.", "error"), saved: true }).end();
			}
		} catch (error) {
			console.error(error);
			serverErr(res);
		}
	});
	router.get("/api/books/mybooks", async (req, res) => {
		if (!req.user) {
			res.json({
				...flash("Must be logged in to see this page.", "error"),
				redirect: "/login"
			});
			return;
		}
		let books = await Book.find({ user: ObjectId(req.user._id) });
		res.json(books).end();
	});
};
