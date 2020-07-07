import Axios from "axios";

/**
 *
 * @param {Object} option
 * @param {"search" | "save" | "mybooks"} option.action
 * @param {string} [option.search]
 * @param {{}} [option.book]
 */
export default async function bookAPI({ action, search, book }) {
	try {
		let { data } = await Axios({
			url: search ? `/api/books/search/${search}` : `/api/books/${action}`,
			method: action === "search" || action === "mybooks" ? "GET" : "PUT",
			data: book,
			withCredentials: true
		});
		return data;
	} catch (error) {
		console.error(error);
		return new Error("Server error.");
	}
}
