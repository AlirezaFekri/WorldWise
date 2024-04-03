import { useContext, useReducer } from "react";
import { createContext } from "react";

const authContext = createContext();
const initialState = {
	user: null,
	status: "notLogin",
	error: null,
};
function reducer(state, action) {
	switch (action.type) {
		case "login":
			return { ...state, user: action.payload, status: "logedIn" };
		case "faildLogin":
			return {
				...state,
				status: "faild to Login",
				error: "username or password wen't wrong",
			};
		case "logOut":
			return { initialState };

		default:
			throw new Error("Unknow type!");
	}
}

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
	const FAKE_USER = {
		fullName: "alireza",
		username: "fekri593@gmail.com",
		password: "1234567",
		avatar: "https://i.pravatar.cc/100?u=zz",
	};
	const [{ user, status, error }, dispatch] = useReducer(reducer, initialState);
	function login(email, password) {
		if (
			email !== undefined &&
			password !== undefined &&
			email === FAKE_USER.username &&
			password === FAKE_USER.password
		) {
			dispatch({ type: "login", payload: FAKE_USER });
		} else {
			dispatch({ type: "faildLogin" });
		}
	}
	function logOut() {
		dispatch({ type: "logOut" });
	}

	return (
		<authContext.Provider value={{ login, logOut, user, status, error }}>
			{children}
		</authContext.Provider>
	);
}
function useAuth() {
	const auth = useContext(authContext);
	if (auth !== undefined) {
		return auth;
	}
	throw new Error("You can use Authprovider outside of Authcontext!");
}

export { AuthProvider, useAuth };
