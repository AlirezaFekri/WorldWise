import React, { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [currentCity, setCurrentCity] = useState({});

	useEffect(() => {
		const controller = new AbortController();
		async function fetchData() {
			setError("");
			setIsLoading(true);
			try {
				const response = await fetch("http://localhost:8000/cities", {
					Signal: controller.signal,
				});
				if (!response.ok) throw new Error("Network Error");
				const data = await response.json();
				if (data.Response === "False") throw new Error("Video not Found!");
				setCities(data);
			} catch (err) {
				if (err.message !== "AbortController") {
					setError(err);
				}
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	async function getCity(id) {
		const controller = new AbortController();
		setError("");
		setIsLoading(true);
		try {
			const response = await fetch(`http://localhost:8000/cities/${id}`, {
				signal: controller.signal,
			});
			if (!response.ok) throw new Error("Network Error");
			const data = await response.json();
			if (data.Response === "False") throw new Error("Video not Found!");
			setCurrentCity(data);
		} catch (err) {
			if (err.message !== "AbortController") {
				setError(err);
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				error,
				setCurrentCity,
				currentCity,
				getCity,
			}}>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const content = useContext(CitiesContext);
	if (content === undefined)
		throw new Error("You can use Postprovider outside of Postcontext!");

	return content;
}

export { CitiesProvider, useCities };
