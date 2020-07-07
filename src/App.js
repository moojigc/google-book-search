import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@material-ui/core/styles/";
import theme from "./utils/theme";
import { BookProvider } from "./utils/BookContext";
import { Provider as UserProvider } from "./utils/UserContext";
import { Provider as FlashProvider } from "./utils/FlashContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookCollection from "./pages/BookCollection";
import userAPI from "./utils/userAPI";

function App() {
	const [user, setUser] = React.useState({
		auth: false,
		username: "Guest",
		_id: ""
	});
	const [flash, setFlash] = React.useState({
		message: "",
		type: "error" || "success"
	});

	React.useEffect(() => {
		userAPI({ action: "user-status" }).then((res) => {
			console.log(res);
			setUser(res);
		});
	}, []);

	return (
		<Router>
			<UserProvider value={{ user, setUser }}>
				<FlashProvider value={{ flash, setFlash }}>
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
								<Route exact path="/mybooks">
									<BookCollection />
								</Route>
							</Switch>
						</BookProvider>
					</ThemeProvider>
				</FlashProvider>
			</UserProvider>
		</Router>
	);
}

export default App;
