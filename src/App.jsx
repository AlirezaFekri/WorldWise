import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRout from "./components/ProtectedRout";

function App() {
	return (
		<>
			<AuthProvider>
				<CitiesProvider>
					<BrowserRouter>
						<Routes>
							<Route index element={<Homepage />} />
							<Route path="pricing" element={<Pricing />} />
							<Route path="products" element={<Product />} />
							<Route
								path="app"
								element={
									<ProtectedRout>
										<AppLayout />
									</ProtectedRout>
								}>
								<Route index element={<Navigate replace to="cities" />} />
								<Route path="cities" element={<CityList />} />
								<Route path="cities/:id" element={<City />} />
								<Route path="countries" element={<CountryList />} />
								<Route path="form" element={<Form />} />
							</Route>
							<Route path="login" element={<Login />} />
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</BrowserRouter>
				</CitiesProvider>
			</AuthProvider>
		</>
	);
}

export default App;
