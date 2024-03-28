import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import useTitle from "../hooks/useTitle";
import { useCities } from "../PostProvider";

function CityList() {
	const { cities, isLoading, error } = useCities();
	useTitle("Cities");
	if (isLoading) return <Spinner />;
	if (!cities.length)
		return <Message message="Add You'r first city by on click the map" />;
	return (
		<ul className={styles.cityList}>
			{error ? (
				<p>{error}</p>
			) : (
				cities.map((item) => <CityItem city={item} key={item.id} />)
			)}
		</ul>
	);
}

export default CityList;
