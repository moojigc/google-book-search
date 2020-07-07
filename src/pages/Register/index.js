// @ts-check
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/EmailOutlined";
import Lock from "@material-ui/icons/Lock";
import Send from "@material-ui/icons/Send";
import userApi from "../../utils/userAPI";
import Wrapper from "../../components/Wrapper";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useUserContext } from "../../utils/UserContext";
import Alert from "../../components/Alert";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	info: {
		background: theme.palette.primary.light,
		color: theme.palette.primary.contrastText,
		padding: "1rem",
		borderRadius: "0.25rem"
	}
}));

const Register = () => {
	const classes = useStyles();
	const [userDetails, setUserDetails] = useState({
		username: "",
		password: "",
		password2: "",
		email: ""
	});
	const history = useHistory();
	const [flash, setFlash] = useState(null);
	// @ts-ignore
	const [user, dispatchUser] = useUserContext();
	const handleRegister = async () => {
		let res = await userApi({
			action: "register",
			userDetails: userDetails
		});
		console.log(res);
		// dispatchUser({ user: res.user });
		setFlash(res.flash);
		if (res.redirect === "/login") history.push(res.redirect);
	};
	useEffect(() => {
		console.log(user);
	}, [user]);
	return (
		<Container maxWidth="lg" component="main">
			<Wrapper>
				<h1 className="heading">Register</h1>
				<form>
					<Grid container justify="center" spacing={2}>
						<Grid item sm={12}>
							<TextField
								onChange={({ target }) =>
									setUserDetails({
										...userDetails,
										email: target.value
									})
								}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Email />
										</InputAdornment>
									)
								}}
								fullWidth
								id="username-or-email"
								variant="filled"
								label="Email"
							/>
						</Grid>
						<Grid item sm={12}>
							<TextField
								onChange={({ target }) =>
									setUserDetails({
										...userDetails,
										username: target.value
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
								label="Username"
							/>
						</Grid>
						<Grid item sm={6}>
							<TextField
								onChange={({ target }) =>
									setUserDetails({ ...userDetails, password: target.value })
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
							/>
						</Grid>
						<Grid item sm={6}>
							<TextField
								onChange={({ target }) =>
									setUserDetails({ ...userDetails, password2: target.value })
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
								label="Confirm Password"
							/>
						</Grid>
						<Grid item>
							<FormGroup row>
								<Button
									onClick={handleRegister}
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
			{flash ? <Alert type={flash.type}>{flash.message}</Alert> : null}
		</Container>
	);
};

export default Register;
