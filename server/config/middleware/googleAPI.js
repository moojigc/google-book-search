const { KEY } = require("../config.json");
const axios = require("axios").default;

/**
 * Make a simple search to google books API
 * @param {string} search
 */
const getBooks = async (search) => {
	return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${KEY}`);
};

module.exports = {
	getBooks: getBooks
};
