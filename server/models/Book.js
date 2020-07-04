const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	authors: {
		type: Array,
		required: true
	},
	description: {
		type: String
	},
	image: {
		type: String,
		match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
	},
	link: {
		type: String,
		match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
	}
});

const Book = model("Book", BookSchema);

module.exports = Book;
