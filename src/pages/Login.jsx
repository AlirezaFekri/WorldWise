import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import useTitle from "../hooks/useTitle";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
	useTitle("Login");
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState("fekri593@gmail.com");
	const [password, setPassword] = useState("1234567");
	const { login, status, error } = useAuth();

	const navigat = useNavigate();
	useEffect(() => {
		if (status === "logedIn") {
			navigat("/app", { replace: true });
		}
	}, [status, navigat]);

	function handleLogin(e) {
		e.preventDefault();
		if (email !== "" && password !== "") {
			login(email, password);
		}
	}

	return (
		<main className={styles.login}>
			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>
				{error && <div>{error}</div>}
				<div>
					<Button type="primary" handleClick={handleLogin}>
						Login
					</Button>
				</div>
			</form>
		</main>
	);
}
