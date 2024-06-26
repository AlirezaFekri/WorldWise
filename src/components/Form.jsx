// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import useUrlPosition from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesProvider";

function Form() {
	useTitle("Add new City");
	const navigate = useNavigate();
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [countryCode, setCountryCode] = useState("");
	const [date, setDate] = useState(
		new Date().toLocaleDateString("en-EN", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		})
	);
	const [notes, setNotes] = useState("");
	const [lat, lng] = useUrlPosition();
	const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
	const [error, setError] = useState("");
	const { isLoading, addCity } = useCities();

	const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

	useEffect(() => {
		async function fetchCityData() {
			try {
				setIsLoadingGeoCoding(true);
				setError("");
				const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
				if (!res.ok) throw new Error("Something went Wrong.");
				const data = await res.json();
				if (data.Response === false) throw new Error("loacation is not ture!");
				if (!data.countryName)
					throw new Error(
						"Hier is not a Country, Please Click another place at Map"
					);
				setCityName(data.city || data.locality || "");
				setCountry(data.countryName);
				setCountryCode(data.countryCode || "");
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoadingGeoCoding(false);
			}
		}
		fetchCityData();
	}, [lat, lng]);

	if (!lat || !lng) {
		return <Message message={"Start with clicking some the Map"} />;
	}
	if (isLoadingGeoCoding) return <Spinner />;
	if (error) return <Message message={error} />;

	async function handleSubmitForm(e) {
		const random = Math.ceil(Math.random() * 99999999);
		e.preventDefault();
		const data = {
			cityName,
			country,
			emoji: countryCode,
			notes,
			date,
			position: {
				lat,
				lng,
			},
			id: random,
		};
		await addCity(data);
		navigate("/app");
	}

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={handleSubmitForm}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
					disabled
				/>
				<span className={styles.flag}>
					<img
						src={`https://flagsapi.com/${countryCode}/flat/32.png`}
						alt="Flag"
					/>
				</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker id="date" onChange={(e) => setDate(e)} selected={date} />
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<Button
					type="back"
					handleClick={(e) => {
						e.preventDefault();
						navigate("/app");
					}}>
					&larr; Back
				</Button>
			</div>
		</form>
	);
}

export default Form;
