import { useAppDispatch, useAppSelector } from '../../hooks';
import { fillOfferList, setCity } from '../../store/action';
import { ULink } from '../u-link/u-link';
import classNames from 'classnames';

type LocationsListProps = {
	cities: string[];
}

function LocationsList({cities}: LocationsListProps) {
	const dispatch = useAppDispatch();
	const currentCity = useAppSelector((state) => state.city);

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
							dispatch(setCity(city));
							dispatch(fillOfferList());
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
