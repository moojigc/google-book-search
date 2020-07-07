import React, { createContext, useReducer, useContext } from "react";
import { Types } from "mongoose";

/**
 * user data from the server
 */
const UserContext = createContext({
	_id: Types.ObjectId(),
	username: "",
	auth: false
});
const { Provider } = UserContext;

const reducer = (userState, action) => {
	return action.user;
};

const UserProvider = ({ value = {}, ...props }) => {
	const [user, dispatch] = useReducer(reducer, {});

	return <Provider value={[user, dispatch]} {...props} />;
};

const useUserContext = () => {
	return useContext(UserContext);
};

export { UserProvider, useUserContext };
