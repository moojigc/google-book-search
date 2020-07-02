import React, { createContext, useReducer, useContext } from "react";
import { Types } from "mongoose";
import { login, register, logout, getUserStatus } from "./userAPI";
/**
 * user data from the server
 */
const UserContext = createContext({
	_id: Types.ObjectId(),
	username: "",
	auth: false
});
const { Provider } = UserContext;

/**
 * Get and set user state
 * @param {{ _id: any, username: string, auth: boolean }} userState
 * @param {{ type: "register" | "login" | "logout" | "user-status", user: {_id, password, email, username, auth: boolean} }} action
 */
const reducer = async (userState, action) => {
	const { type, user } = action;
	switch (type) {
		case "login":
			const res = await login({
				username: user.username,
				email: user.email,
				password: user.password
			});
			return { username: res.user.username, _id: res.user._id, auth: res.user.auth };
		default:
			break;
	}
};

const UserProvider = ({ value = {}, ...props }) => {
	const [user, dispatch] = useReducer(reducer, {});

	return <Provider value={[user, dispatch]} {...props} />;
};

const useUserContext = () => {
	return useContext(UserContext);
};

export { UserProvider, useUserContext };
