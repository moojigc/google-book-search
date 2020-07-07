import React, { useState } from "react";
import {
	Grid,
	Container,
	TextField,
	Button,
	makeStyles,
	useMediaQuery,
	CircularProgress,
	Fade,
	Box
} from "@material-ui/core";
import Wrapper from "../../components/Wrapper";
import bookAPI from "../../utils/bookAPI";
import SearchResult from "../../components/SearchResult";
import Typography from "@material-ui/core/Typography";
import { useUserContext } from "../../utils/UserContext";
import userAPI from "../../utils/userAPI";

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
	const [_, dispatchUser] = useUserContext();
	const [searchSubmitted, setSearchSubmitted] = useState(false);
	const isMobile = useMediaQuery("(max-width: 997px)");
	const classes = useStyles();
	const [search, setSearch] = useState("rezero");
	const [results, setResults] = useState([]);
	const handleSubmit = async (event) => {
		event.preventDefault();
		setSearchSubmitted(true);
		setResults([]);
		let user = await userAPI({ action: "user-status" });
		let books = await bookAPI({ action: "search", search: search });
		setResults(books.items);
		dispatchUser({ user: user });
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
			<Fade in={searchSubmitted}>
				<Wrapper>
					{results?.length ? (
						<SearchResult books={results} />
					) : (
						<Box
							margin="1rem"
							display="flex"
							flexDirection="column"
							alignItems="center">
							<CircularProgress size="4rem" />
							<Typography>Loading results...</Typography>
						</Box>
					)}
				</Wrapper>
			</Fade>
		</Container>
	);
};
export default Search;
