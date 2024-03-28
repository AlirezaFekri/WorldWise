/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styles from "./CityItem.module.css";

function CityItem({ city }) {
	const {
		id,
		emoji,
		cityName,
		date,
		position: { lat, lng },
	} = city;
	const dateS = new Date(date);
	return (
		<li>
			<NavLink to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
				<span className={styles.emoji}>
					<img src={`https://flagsapi.com/${emoji}/flat/32.png`} alt="Flag" />
				</span>
				<p className={styles.name}>{cityName}</p>
				<p className={styles.date}>
					{dateS.toLocaleDateString("en-EN", {
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
