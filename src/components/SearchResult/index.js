import React, { useState, useEffect } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

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
	}
}));

const SearchResult = ({ books }) => {
	const classes = useStyles();
	return (
		<div style={{ width: "100%" }}>
			{books.length
				? books.map((book) => {
						let { volumeInfo, saleInfo } = book;
						return (
							<Accordion className={classes.accordion} key={volumeInfo.id}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header">
									<Grid container justify="space-between">
										{volumeInfo.imageLinks ? (
											<Grid item sm={3}>
												<div>
													<img
														src={volumeInfo.imageLinks.thumbnail}
														alt={volumeInfo.title + " preview"}
													/>
												</div>
											</Grid>
										) : null}
										<Grid item>
											<Typography variant="h5">
												{volumeInfo.title} by{" "}
												{volumeInfo.authors.reduce(
													(pv, cv) => pv + " " + cv
												)}
											</Typography>
										</Grid>
									</Grid>
								</AccordionSummary>
								<AccordionDetails>
									<Grid container spacing={2}>
										<Grid item className={classes.description}>
											{saleInfo.saleability === "FOR_SALE" ? (
												<Chip
													color="secondary"
													label={"$" + saleInfo.retailPrice?.amount}
												/>
											) : null}
											{volumeInfo.averageRating ? (
												<Rating disabled value={volumeInfo.averageRating} />
											) : (
												<Chip color="secondary" label="No rating" />
											)}
										</Grid>
										<Grid item>
											<div className={classes.details}>
												<Typography>{volumeInfo.description}</Typography>
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
