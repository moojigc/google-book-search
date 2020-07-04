import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@material-ui/core/styles/";
import theme from "./utils/theme";
import { BookProvider } from "./utils/BookContext";

function App() {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<BookProvider>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Search />
						</Route>
					</Switch>
				</BookProvider>
			</ThemeProvider>
		</Router>
	);
}

export default App;
