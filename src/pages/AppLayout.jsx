import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import User from "../components/User";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";

function AppLayout() {
	const {
		user: { fullName, avatar },
	} = useAuth();

	const [user, setUser] = useLocalStorage("basicDataUser", []);

	useEffect(() => {
		setUser({ fullName, avatar });
	}, [avatar, fullName, setUser]);
	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
			<User />
		</div>
	);
}

export default AppLayout;
