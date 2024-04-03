import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvent,
	useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesProvider";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeoLocation";
import useUrlPosition from "../hooks/useUrlPosition";
function Map() {
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const { cities, setCurrentCity } = useCities();
	const { isLoading, position, getPosition } = useGeolocation();
	const [lat, lng] = useUrlPosition();
	useEffect(() => {
		if (lat && lng) setMapPosition([lat, lng]);
	}, [lat, lng]);
	
	useEffect(() => {
		setMapPosition(position);
	}, [position]);

	const navigate = useNavigate();
	return (
		<div className={styles.mapContainer}>
			{!position && (
				<Button type="position" handleClick={getPosition}>
					{isLoading ? "Loading..." : "Current Loacation"}
				</Button>
			)}
			<MapContainer
				center={mapPosition || [40, 0]}
				className={styles.map}
				zoom={5}
				scrollWheelZoom={true}>
				<TileLayer
					attribution="&copy; Developed By WorlWise Teame"
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						key={city.id}
						position={[city.position.lat, city.position.lng]}
						eventHandlers={{
							click: () => {
								setCurrentCity(city);
								navigate(
									`cities/${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`
								);
							},
						}}>
						<Popup>
							<span>
								<img
									src={`https://flagsapi.com/${city.emoji}/flat/16.png`}
									alt="Flag"
								/>
								{city.cityName}
							</span>
						</Popup>
					</Marker>
				))}
				<ChangeView position={mapPosition || [40, 0]} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}
function ChangeView({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}
function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: (e) => {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
}

export default Map;
