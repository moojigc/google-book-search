import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Search from "@material-ui/icons/Search";
import { Link as A, useHistory } from "react-router-dom";
import {
	makeStyles,
	List,
	ListItemText,
	Drawer,
	ListItemIcon,
	ListItem,
	Link
} from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	nav: {
		background: theme.palette.primary.dark
	},
	drawer: {
		background: theme.palette.primary.dark,
		padding: "1rem",
		height: "inherit"
	}
}));

export default function Navbar() {
	const history = useHistory();
	const classes = useStyles();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const toggleDrawer = (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}

		setDrawerOpen(!drawerOpen);
	};
	const logout = () => {};
	const AppDrawer = () => {
		return (
			<Drawer variant="temporary" anchor="left" open={drawerOpen} onClose={toggleDrawer}>
				<div className={classes.drawer}>
					<List>
						<ListItem button component={A} to="/profile" key="my-profile">
							<ListItemIcon>
								<AccountCircle />
							</ListItemIcon>
							<ListItemText>
								<Link color="textPrimary" component={A} to="/profile">
									My Profile
								</Link>
							</ListItemText>
						</ListItem>
						<ListItem button component={A} to="/search" key="search-books">
							<ListItemIcon>
								<Search />
							</ListItemIcon>
							<ListItemText>Search Books</ListItemText>
						</ListItem>
						<ListItem button component={A} to="/logout" key="logout">
							<ListItemIcon>
								<ExitToApp />
							</ListItemIcon>
							<ListItemText>
								<Link color="textPrimary" component="div" onClick={logout}>
									Log Out
								</Link>
							</ListItemText>
						</ListItem>
					</List>
				</div>
			</Drawer>
		);
	};
	return (
		<div>
			<AppDrawer />
			<AppBar className={classes.nav} position="static">
				<Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
					<IconButton
						onClick={toggleDrawer}
						edge="start"
						color="inherit"
						aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">Google Books Search</Typography>
					<Button color="inherit">
						<Link color="textPrimary" component={A} to="/login">
							Login
						</Link>
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
