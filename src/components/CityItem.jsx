/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styles from "./CityItem.module.css";

function CityItem({ city }) {
	const date = new Date(city.date);
	return (
		<li>
			<NavLink to={`${city.id}`} className={styles.cityItem}>
				<span className={styles.emoji}>
					<img
						src={`https://flagsapi.com/${city.emoji}/flat/32.png`}
						alt="Flag"
					/>
				</span>
				<p className={styles.name}>{city.cityName}</p>
				<p className={styles.date}>
					{date.toLocaleDateString("en-EN", {
						month: "long",
						day: "2-digit",
						year: "numeric",
					})}
				</p>
				<button className={styles.deleteBtn}>x</button>
			</NavLink>
		</li>
	);
}

export default CityItem;
