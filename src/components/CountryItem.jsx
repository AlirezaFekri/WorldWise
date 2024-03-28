import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
	return (
		<li className={styles.countryItem}>
			<span>
				<img
					src={`https://flagsapi.com/${country.emoji}/flat/32.png`}
					alt="Flag"
				/>
			</span>
			<span>{country.country}</span>
		</li>
	);
}

export default CountryItem;
