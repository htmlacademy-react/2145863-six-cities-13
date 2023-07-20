import { CITIES } from "../../constants";
import { ULink } from "../u-link/u-link";

function LocationsList() {
	return (
		<ul className="locations__list tabs__list">
			{/* tabs__item--active */}
			{CITIES.map((city) =>
				<li className="locations__item" key={city}>
					<ULink className="locations__item-link tabs__item" href="#">
						<span>{city}</span>
					</ULink>
				</li>
			)}
		</ul>
	);
}

export default LocationsList;
