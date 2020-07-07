import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@material-ui/core/styles/";
import theme from "./utils/theme";
import { BookProvider } from "./utils/BookContext";
import { UserProvider } from "./utils/UserContext";
import Login from "./pages/Login";
import UserStatus from "./components/UserStatus";
import Register from "./pages/Register";

function App() {
	return (
		<Router>
			<UserProvider>
				<UserStatus>
					<ThemeProvider theme={theme}>
						<BookProvider>
							<Navbar />
							<Switch>
								<Route exact path="/">
									<Search />
								</Route>
								<Route exact path="/search">
									<Search />
								</Route>
								<Route exact path="/login">
									<Login />
								</Route>
								<Route exact path="/register">
									<Register />
								</Route>
							</Switch>
						</BookProvider>
					</ThemeProvider>
				</UserStatus>
			</UserProvider>
		</Router>
	);
}

export default App;
