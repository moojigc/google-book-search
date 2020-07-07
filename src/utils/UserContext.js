import React, { createContext, useReducer, useContext } from "react";
import { Types } from "mongoose";

/**
 * user data from the server
 */
const UserContext = createContext({
	_id: Types.ObjectId,
	username: "",
	auth: false
});
const { Provider } = UserContext;

export { Provider, UserContext };
