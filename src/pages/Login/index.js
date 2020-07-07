// @ts-check
import React, { useEffect, useState, useContext } from "react";
import { Link as A, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import Face from "@material-ui/icons/Face";
import Lock from "@material-ui/icons/Lock";
import Send from "@material-ui/icons/Send";
import userApi from "../../utils/userAPI";
import Wrapper from "../../components/Wrapper";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { UserContext } from "../../utils/UserContext";
import Alert from "../../components/Alert";
import { makeStyles, Link, Box } from "@material-ui/core";
import { FlashContext } from "../../utils/FlashContext";

const useStyles = makeStyles((theme) => ({
	info: {
		background: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		borderRadius: "0.25rem",
		marginBottom: "1rem",
		textAlign: "center",
		fontSize: "1.5rem",
		cursor: "pointer",
		width: "100%",
		textTransform: "unset",
		"& a": {
			color: "inherit",
			textDecoration: "unset",
			fontWeight: 300,
			"&:hover": {
				color: "unset"
			}
		}
	}
}));

const Login = () => {
	const classes = useStyles();
	const { flash, setFlash } = useContext(FlashContext);
	const [loginDetails, setLoginDetails] = useState({
		usernameOrEmail: "",
		password: "",
		rememberMe: false
	});
	const history = useHistory();
	const { user, setUser } = useContext(UserContext);
	const handleLogin = async () => {
		let res = await userApi({
			action: "login",
			userDetails: loginDetails
		});
		console.log(res);
		if (res.user.auth) history.push("/");
		setUser(res.user);
		setFlash(res.flash);
	};
	return (
		<Container maxWidth="lg" component="main">
			<Wrapper>
				<h1 className="heading">Login</h1>
				<form>
					<Grid container justify="center" spacing={2}>
						<Grid item sm={12}>
							<Button className={classes.info} variant="contained" color="secondary">
								<A to="/register">Click here to sign up for a new account.</A>
							</Button>
						</Grid>
						<Grid item sm={12}>
							<TextField
								onChange={({ target }) =>
									setLoginDetails({
										...loginDetails,
										usernameOrEmail: target.value
									})
								}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Face />
										</InputAdornment>
									)
								}}
								fullWidth
								id="username-or-email"
								variant="filled"
								label="Username/Email"
							/>
						</Grid>
						<Grid item sm={12}>
							<TextField
								onChange={({ target }) =>
									setLoginDetails({ ...loginDetails, password: target.value })
								}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Lock />
										</InputAdornment>
									)
								}}
								fullWidth
								id="password"
								variant="filled"
								label="Password"
								type="password"
							/>
						</Grid>
						<Grid item>
							<FormGroup row>
								<FormControlLabel
									control={
										<Switch
											checked={loginDetails.rememberMe}
											onChange={({ target }) =>
												setLoginDetails({
													...loginDetails,
													rememberMe: target.checked
												})
											}
										/>
									}
									label="Remember me?"
								/>
							</FormGroup>
							<FormGroup row>
								<Button
									onClick={handleLogin}
									style={{ marginTop: "1rem" }}
									variant="contained"
									size="large">
									Submit
									<InputAdornment position="end">
										<Send />
									</InputAdornment>
								</Button>
							</FormGroup>
						</Grid>
					</Grid>
				</form>
			</Wrapper>
			{flash.message ? <Alert type={flash.type}>{flash.message}</Alert> : null}
		</Container>
	);
};

export default Login;
