import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const SearchResult = () => {
	const [books, dispatchBooks] = useBookContext;
	return (
		<div style={{ width: "100%" }}>
			{books.map((book) => {
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header">
						<Typography>title</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>summary</Typography>
					</AccordionDetails>
				</Accordion>;
			})}
		</div>
	);
};

export default SearchResult;
