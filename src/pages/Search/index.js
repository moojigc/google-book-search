import React, { useState, useRef } from "react";
import { Grid, Container, TextField, Button, makeStyles } from "@material-ui/core";
import Axios from "axios";
import Wrapper from "../../components/Wrapper";
import { useBookContext } from "../../utils/BookContext";

const useStyles = makeStyles((theme) => ({
	button: {
		color: theme.palette.secondary.contrastText,
		marginTop: "1rem"
	},
	input: {
		background: "white",
		borderRadius: "0.15rem"
	}
}));

const Search = () => {
	const classes = useStyles();
	const [search, setSearch] = useState("");
	const [books, dispatchBooks] = useBookContext();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const { data } = await Axios({
			url: `/api/books/${search}`,
			method: "GET"
		});
		dispatchBooks({ books: data.items });
		console.log(books);
	};
	return (
		<Container maxWidth="lg">
			<Wrapper>
				<Grid container>
					<Grid item xs={12}>
						<form>
							<TextField
								className={classes.input}
								type="text"
								color="primary"
								onChange={(event) => setSearch(event.target.value)}
								name="book-search"
								id="google-book-search"
								label="Search Google Books"
								variant="filled"
								fullWidth
							/>
							<Button
								className={classes.button}
								onClick={handleSubmit}
								type="submit"
								variant="contained"
								color="primary">
								Submit
							</Button>
						</form>
					</Grid>
				</Grid>
			</Wrapper>
		</Container>
	);
};

export default Search;
