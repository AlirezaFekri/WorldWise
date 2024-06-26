/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesProvider";

function CityItem({ city }) {
	const { deleteCity } = useCities();
	const {
		id,
		emoji,
		cityName,
		date,
		position: { lat, lng },
	} = city;
	const { currentCity } = useCities();
	const isActive = id === currentCity.id;
	const dateS = new Date(date);

	async function handleDelete(e) {
		e.preventDefault();
		await deleteCity(id);
		
	}
	return (
		<li>
			<NavLink
				to={`${id}?lat=${lat}&lng=${lng}`}
				className={`${styles.cityItem} ${
					isActive ? styles["cityItem--active"] : ""
				}`}>
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
				<button onClick={handleDelete} className={styles.deleteBtn}>
					x
				</button>
			</NavLink>
		</li>
	);
}

export default CityItem;
