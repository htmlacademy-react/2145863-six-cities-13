import { ULink } from '../u-link/u-link';
import classNames from 'classnames';

type LocationsListProps = {
	cities: string[];
	currentCity: string;
	handleTabClick: (city: string) => void;
}

function LocationsList({cities, currentCity, handleTabClick}: LocationsListProps) {

	return (
		<ul className="locations__list tabs__list">
			{cities.map((city) =>
				(
					<li className="locations__item" key={city}>
						<ULink href="#" className={classNames(
							'locations__item-link',
							{'tabs__item--active': city === currentCity},
							'tabs__item',
						)}
						onClick={(evt) => {
							evt.preventDefault();
							handleTabClick(city);
						}}
						>
							<span>{city}</span>
						</ULink>
					</li>
				)
			)}
		</ul>
	);
}

export default LocationsList;
