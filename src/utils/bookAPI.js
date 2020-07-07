import Axios from "axios";

/**
 *
 * @param {Object} option
 * @param {"search" | "save" | "mybooks" | "delete"} option.action
 * @param {string} [option.search]
 * @param {{}} [option.book]
 * @param {string} [option.id]
 */
export default async function bookAPI({ action, search, book, id }) {
	try {
		let getURLandMethod = () => {
			switch (action) {
				case "delete":
					return { url: "/" + id, method: "DELETE" };
				case "search":
					return { url: "/search/" + search, method: "GET" };
				case "save":
					return { url: "/save", method: "PUT" };
				default:
					return { url: "/mybooks", method: "GET" };
			}
		};
		let { method, url } = getURLandMethod();
		let { data } = await Axios({
			url: "/api/books" + url,
			method: method,
			data: book,
			withCredentials: true
		});
		return data;
	} catch (error) {
		console.error(error);
		return new Error("Server error.");
	}
}
