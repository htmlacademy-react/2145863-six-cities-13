import { useRef } from 'react';
import { ULink } from '../u-link/u-link';
import { getRandomInteger } from '../../utils/common';
import { AppRoute, CITIES } from '../../constants';

function RandomCity(): React.JSX.Element {
	const cities = Array.from(CITIES);
	const randomCity = useRef(cities[getRandomInteger(cities.length)]);

	return (
		<div className="locations__item">
			<ULink
				className="locations__item-link"
				href={`${AppRoute.Main}?filter=${randomCity.current}`}
			>
				<span data-testid="random-city-id">{randomCity.current}</span>
			</ULink>
		</div>
	);
}

export default RandomCity;
