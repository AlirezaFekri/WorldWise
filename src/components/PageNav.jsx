import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
function PageNav() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<NavLink className="ac" to="/">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink className="ac" to="/pricing">
						Pricing
					</NavLink>
				</li>
				<li>
					<NavLink className="ac" to="/products">
						Products
					</NavLink>
				</li>
				<li>
					<NavLink className="ac" to="/app">
						App
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default PageNav;
