import Axios from "axios";

/**
 *
 * @param {Object} option
 * @param {"search" | "save"} option.action
 */
export default async function bookAPI({ action, book }) {
	let { data } = await Axios({
		url: `/api/book/${action}`,
		method: action === "search" ? "GET" : "PUT"
	});
}
