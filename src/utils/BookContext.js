import React, { createContext, useReducer, useContext } from "react";

/**
 * book data
 */
const BookContext = createContext({
	title: "",
	description: "",
	authors: [""]
});
const { Provider } = BookContext;

const reducer = async (BookState, action) => {
	return action.books;
};

const BookProvider = ({ value = [], ...props }) => {
	const [book, dispatch] = useReducer(reducer, []);

	return <Provider value={[book, dispatch]} {...props} />;
};

const useBookContext = () => {
	return useContext(BookContext);
};

export { BookProvider, useBookContext };
