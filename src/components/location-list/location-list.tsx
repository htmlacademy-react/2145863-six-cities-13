import { CITIES } from "../../constants";

function LocationsList() {
	return (
		<ul className="locations__list tabs__list">
			{/* tabs__item--active */}
			{CITIES.map((city) =>
				<li className="locations__item" key={city}>
					<a className="locations__item-link tabs__item" href="#">
						<span>{city}</span>
					</a>
				</li>
			)}
		</ul>
	);
}

export default LocationsList;
