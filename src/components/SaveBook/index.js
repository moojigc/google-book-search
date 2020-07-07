import React, { useState, useEffect } from "react";
import { Chip, CircularProgress } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useUserContext } from "../../utils/UserContext";
import { Link as A } from "react-router-dom";
import bookAPI from "../../utils/bookAPI";

const SaveBook = ({ book }) => {
	const [auth, setAuth] = useState(false);
	const [user] = useUserContext();
	const [saved, setSaved] = useState(false);
	const handleSaveBook = async () => {
		let res = await bookAPI({ action: "save", books: book });
	};
	useEffect(() => {
		if (user) setAuth(user.auth);
	}, [user]);
	return auth ? (
		saved ? (
			<Chip label="Already saved!" />
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
