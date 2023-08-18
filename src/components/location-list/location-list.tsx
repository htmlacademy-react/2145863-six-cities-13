import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ULink } from '../u-link/u-link';
import { offersActions } from '../../store/offers/offers.slice';
import { getCity } from '../../store/offers/offers.selectors';

type LocationsListProps = {
	cities: string[];
}

function LocationsList({cities}: LocationsListProps) {
	const dispatch = useAppDispatch();
	const currentCity = useAppSelector(getCity);

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
							dispatch(offersActions.setCity(city));
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
