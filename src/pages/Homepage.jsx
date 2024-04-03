import { NavLink } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthProvider";

export default function Homepage() {
	const { status } = useAuth();
	return (
		<main className={styles.homepage}>
			<PageNav />
			<section>
				<h1>
					You travel the world.
					<br />
					WorldWise keeps track of your adventures.
				</h1>
				<h2>
					A world map that tracks your footsteps into every city you can think
					of. Never forget your wonderful experiences, and show your friends how
					you have wandered the world.
				</h2>
				<NavLink to={status === "logedIn" ? "/app" : "/login"} className="cta">
					Start tracking Now!
				</NavLink>
			</section>
		</main>
	);
}
