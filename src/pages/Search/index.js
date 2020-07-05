import React, { useState, useEffect } from "react";
import { Grid, Container, TextField, Button, makeStyles, useMediaQuery } from "@material-ui/core";
import Wrapper from "../../components/Wrapper";
import { useBookContext } from "../../utils/BookContext";
import bookAPI from "../../utils/bookAPI";
import SearchResult from "../../components/SearchResult";

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
	const isMobile = useMediaQuery("(max-width: 997px)");
	const classes = useStyles();
	const [search, setSearch] = useState("rezero");
	const [results, setResults] = useState([]);
	const handleSubmit = async (event) => {
		event.preventDefault();
		const books = await bookAPI({ action: "search", search: search });
		setResults(books.items);
		console.log(books);
	};
	return (
		<Container maxWidth={isMobile ? "xl" : "lg"}>
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
			{results.length ? (
				<Wrapper>
					<SearchResult books={results} />
				</Wrapper>
			) : null}
		</Container>
	);
};
export default Search;
