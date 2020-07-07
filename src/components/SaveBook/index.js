import React, { useState, useEffect, useContext } from "react";
import { Chip, CircularProgress } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { UserContext } from "../../utils/UserContext";
import { Link as A } from "react-router-dom";
import bookAPI from "../../utils/bookAPI";

const SaveBook = ({ book, classes }) => {
	const [flash, setFlash] = useState({});
	const [auth, setAuth] = useState(false);
	const { user, setUser } = useContext(UserContext);
	const [saved, setSaved] = useState(false);
	const handleSaveBook = async () => {
		let res = await bookAPI({
			action: "save",
			search: false,
			book: {
				title: book.volumeInfo.title,
				authors: book.volumeInfo.authors,
				googleId: book.id,
				image: book.volumeInfo.imageLinks?.large || book.volumeInfo.imageLinks?.thumbnail,
				link: book.volumeInfo.previewLink,
				description: book.volumeInfo.description
			}
		});
		setSaved(res.saved);
		setFlash(res.flash);
	};
	useEffect(() => {
		if (user) setAuth(user.auth);
	}, [user]);
	return auth ? (
		saved ? (
			<Chip
				className={
					flash.type === "error" ? classes.saveChipOnError : classes.saveChipOnSuccess
				}
				label={flash.message}
			/>
		) : (
			<Chip
				onClick={handleSaveBook}
				clickable
				icon={<AddIcon />}
				label="Save to my collection"
			/>
		)
	) : (
		<Chip
			clickable
			icon={<AddIcon />}
			label="Login to save to collection."
			component={A}
			to="/login"
		/>
	);
};

export default SaveBook;
