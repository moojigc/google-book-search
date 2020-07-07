import React, { useState, useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, Box, Divider, CircularProgress } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import bookAPI from "../../utils/bookAPI";
import { useUserContext } from "../../utils/UserContext";
import SaveBook from "../SaveBook";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
	accordion: {
		background: theme.palette.primary.main
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
	},
	priceChip: {
		background: theme.palette.success.main,
		color: theme.palette.secondary.contrastText
	},
	saveChipOnSuccess: {
		background: theme.palette.success.dark,
		color: theme.palette.secondary.contrastText
	},
	saveChipOnError: {
		background: theme.palette.error.light,
		color: theme.palette.error.contrastText
	}
}));

const SearchResult = ({ books }) => {
	const [user] = useUserContext();
	const classes = useStyles();

	return (
		<div style={{ width: "100%" }}>
			{books.length
				? books.map((book) => {
						let { volumeInfo, saleInfo } = book;
						return (
							<Accordion className={classes.accordion} key={volumeInfo.id}>
								<AccordionSummary
									key={volumeInfo.id}
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header">
									<Grid container justify="space-between">
										{volumeInfo.imageLinks ? (
											<Grid item sm={1}>
												<Box boxShadow={6} flex alignItems="center">
													<img
														src={volumeInfo.imageLinks.thumbnail}
														alt={volumeInfo.title + " preview"}
													/>
												</Box>
											</Grid>
										) : null}
										<Grid item sm={volumeInfo.imageLinks ? 10 : 12}>
											<Typography variant="h5">{volumeInfo.title}</Typography>
											<Typography variant="h6">
												By{" "}
												{volumeInfo.authors.reduce(
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
											<SaveBook book={book} classes={classes} />
											{saleInfo.saleability === "FOR_SALE" ? (
												<Chip
													className={classes.priceChip}
													clickable
													label={
														"$" +
														saleInfo.retailPrice?.amount +
														" - Buy now from Google"
													}
													component="a"
													href={saleInfo.buyLink}
													rel="noreferrer"
													target="_blank"
												/>
											) : null}
											{volumeInfo.averageRating ? (
												<Rating
													name="score out of 5"
													style={{ opacity: 1 }}
													disabled
													value={volumeInfo.averageRating}
												/>
											) : (
												<Chip color="secondary" label="No rating" />
											)}
										</Grid>
										<Grid item>
											<div className={classes.details}>
												<Typography color="textPrimary">
													<Link
														color="textSecondary"
														href={volumeInfo.previewLink}>
														See more details on Google Books...{" "}
													</Link>
													{volumeInfo.description}
												</Typography>
											</div>
										</Grid>
									</Grid>
								</AccordionDetails>
							</Accordion>
						);
				  })
				: null}
		</div>
	);
};

export default SearchResult;
