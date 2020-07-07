const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
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
	},
	googleId: {
		type: String,
		required: true
	}
});

const Book = model("Book", BookSchema);

module.exports = Book;
