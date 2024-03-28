import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";

function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

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

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index element={<Homepage />} />
					<Route path="pricing" element={<Pricing />} />
					<Route path="products" element={<Product />} />
					<Route path="app" element={<AppLayout />}>
						<Route
							path="cities"
							element={
								<CityList cities={cities} error={error} isLoading={isLoading} />
							}
						/>
						<Route path="cities/:id" element={<City cities={cities} />} />
						<Route
							path="countries"
							element={<CountryList cities={cities} isLoading={isLoading} />}
						/>
						<Route path="form" element={<p> Form </p>} />
						<Route
							index
							element={
								<CityList cities={cities} error={error} isLoading={isLoading} />
							}
						/>
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
