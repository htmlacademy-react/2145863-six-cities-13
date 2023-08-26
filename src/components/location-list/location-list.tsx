import clsx from 'clsx';
import { useAppSelector } from '../../hooks';
import { ULink } from '../u-link/u-link';
import { getCity } from '../../store/offers/offers.selectors';
import { useSearchParams } from 'react-router-dom';

type LocationsListProps = {
	cities: string[];
}

function LocationsList({cities}: LocationsListProps) {
	const currentCity = useAppSelector(getCity);
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<ul className="locations__list tabs__list">
			{cities.map((city) =>
				(
					<li className="locations__item" key={city}>
						<ULink href="#" className={clsx(
							'locations__item-link',
							city === currentCity && 'tabs__item--active',
							'tabs__item',
						)}
						onClick={(evt) => {
							evt.preventDefault();
							const onlyParams = Object.fromEntries(searchParams);
							setSearchParams({...onlyParams, filter: city});
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
