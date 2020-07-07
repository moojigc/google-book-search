import Axios from "axios";

/**
 *
 * @param {Object} option
 * @param {"search" | "save"} option.action
 */
export default async function bookAPI({ action, search, book }) {
	try {
		let { data } = await Axios({
			url: `/api/books/${action + search ? "search/" + search : null}`,
			method: action === "search" ? "GET" : "PUT",
			data: book
		});
		return data;
	} catch (error) {
		console.error(error);
		return new Error("Server error.");
	}
}
