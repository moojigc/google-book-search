import React, { useState } from "react";
import {
	Grid,
	Container,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box
} from "@material-ui/core";
import Wrapper from "../../components/Wrapper";
import bookAPI from "../../utils/bookAPI";

const BookCollection = () => {
	const [books, setBooks] = useState([]);
	React.useEffect(() => {
		bookAPI({ action: "mybooks" }).then((res) => (res.length ? setBooks(res) : []));
	}, []);
	return (
		<Container>
			<Wrapper>
				<h1 className="heading">Books</h1>
				<Grid container spacing={2}>
					<Grid item sm={12}>
						<Box padding="0.5rem">
							{books.map((book) => {
								return (
									<Accordion>
										<AccordionSummary>
											{book.image ? (
												<Grid item sm={1}>
													<Box boxShadow={6} flex alignItems="center">
														<img
															src={book.image}
															alt={book.title + " preview"}
														/>
													</Box>
												</Grid>
											) : null}
											<Grid item sm={book.image ? 10 : 11}>
												{book.title}
											</Grid>
										</AccordionSummary>
									</Accordion>
								);
							})}
						</Box>
					</Grid>
				</Grid>
			</Wrapper>
		</Container>
	);
};

export default BookCollection;
