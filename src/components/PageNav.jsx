import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./../components/Logo"
function PageNav() {
	return (
		<nav className={styles.nav}>
			<NavLink to="/">
				<Logo />
			</NavLink>
			<ul>
				<li>
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
				<li>
					<NavLink to="/products">Products</NavLink>
				</li>
				<li>
					<NavLink to="/login">login</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default PageNav;
