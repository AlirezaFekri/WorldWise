import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./../components/Logo";

function PageNav() {

	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<li>
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
				<li>
					<NavLink to="/products">Products</NavLink>
				</li>
				<li>
					<NavLink
						to={status === "logedIn" ? "/app" : "login"}
						className={styles.ctaLink}>
						{status === "logedIn" ? "Go to App" : "Login"}
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default PageNav;
