import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import Button from "./Button";
import useTitle from "../hooks/useTitle";
import { useCities } from "../PostProvider";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
		weekday: "long",
	}).format(new Date(date));

function City() {
	const { cities } = useCities();
	const navigate = useNavigate();
	const { id } = useParams();
	const currentCity = cities.filter((el) => el.id === Number(id));
	const {
		0: { cityName, emoji, date, notes },
	} = currentCity;
	useTitle(cityName);
	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>
						<img src={`https://flagsapi.com/${emoji}/flat/32.png`} alt="Flag" />
					</span>{" "}
					{cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target="_blank"
					rel="noreferrer">
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>

			<div>
				<Button handleClick={() => navigate(-1)} type={"back"}>
					&larr;Go Back
				</Button>
			</div>
		</div>
	);
}

export default City;
