import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import useTitle from "../hooks/useTitle";
import { useCities } from "./../contexts/CitiesProvider";

function CountryList() {
	
	const { cities, isLoading } = useCities();
	useTitle("countries");

	if (isLoading) return <Spinner />;
	if (!cities.length)
		return <Message message="Add You'r first city by on click the map" />;

	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country)) {
			return [...arr, { country: city.country, emoji: city.emoji }];
		} else {
			return arr;
		}
	}, []);

	return (
		<div className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.country} />
			))}
		</div>
	);
}

export default CountryList;
