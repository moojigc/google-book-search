import React, { useState } from "react";
import {
	Grid,
	Container,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Typography,
	Divider,
	Chip,
	makeStyles,
	Link
} from "@material-ui/core";
import Wrapper from "../../components/Wrapper";
import bookAPI from "../../utils/bookAPI";
import { ExpandMore, Remove, Error, ErrorOutline } from "@material-ui/icons";

const BookCollection = () => {
	const useStyles = makeStyles((theme) => ({
		accordion: {
			background: theme.palette.primary.main,
			borderRadius: "0.25rem"
		},
		description: {
			display: "flex",
			justifyContent: "space-between",
			width: "100%"
		},
		details: {
			background: theme.palette.secondary.light,
			color: theme.palette.secondary.contrastText,
			padding: "0.5rem",
			borderRadius: "0.25rem"
		}
	}));
	const classes = useStyles();
	const [books, setBooks] = useState([]);
	const removeBook = async (id) => {
		let res = await bookAPI({ action: "delete", id: id });
		setBooks(books.filter((book) => book._id !== res._id));
	};
	React.useEffect(() => {
		bookAPI({ action: "mybooks" }).then((res) => (res.length ? setBooks(res) : []));
	}, []);
	return (
		<Container>
			<Wrapper>
				<h1 className="heading">My Saved Books</h1>
				<Grid container spacing={2}>
					<Grid item sm={12}>
						{books.length ? (
							<Box className={classes.accordion}>
								{books.map((book) => {
									return (
										<Accordion key={book._id}>
											<AccordionSummary
												expandIcon={<ExpandMore />}
												aria-controls="panel1a-content"
												id="panel1a-header">
												<Grid
													container
													spacing={2}
													style={{
														display: "flex",
														justifyContent: "space-between"
													}}>
													{book.image ? (
														<Grid item sm={1}>
															<Box
																boxShadow={6}
																flex
																alignItems="center">
																<img
																	src={book.image}
																	alt={book.title + " preview"}
																/>
															</Box>
														</Grid>
													) : null}
													<Grid item sm={book.image ? 10 : 12}>
														<Typography variant="h5">
															{book.title}
														</Typography>
														<Typography variant="h6">
															By{" "}
															{book.authors.reduce(
																(pv, cv) => pv + ", " + cv
															)}
														</Typography>
													</Grid>
												</Grid>
											</AccordionSummary>
											<Divider />
											<AccordionDetails>
												<Grid container spacing={2}>
													<Grid item className={classes.description}>
														<Box>
															<Chip
																onClick={() => removeBook(book._id)}
																icon={<Remove />}
																clickable
																label="Remove from my collection"
															/>
														</Box>
													</Grid>
													<Grid item>
														<div className={classes.details}>
															<Typography color="textPrimary">
																<Link
																	color="textSecondary"
																	href={book.link}>
																	See more details on Google
																	Books...{" "}
																</Link>
																{book.description}
															</Typography>
														</div>
													</Grid>
												</Grid>
											</AccordionDetails>
										</Accordion>
									);
								})}
							</Box>
						) : (
							<Box width="100%">
								<Typography
									align="center"
									color="textPrimary"
									variant="h4"
									component="h2">
									<ErrorOutline />
									No books saved!
								</Typography>
							</Box>
						)}
					</Grid>
				</Grid>
			</Wrapper>
		</Container>
	);
};

export default BookCollection;
