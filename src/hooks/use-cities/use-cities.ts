import { useSearchParams } from 'react-router-dom';
import { CITIES } from '../../constants';
import { useActionCreators, useAppSelector } from '..';
import { offersActions } from '../../store/offers/offers.slice';
import { getCity, getSort } from '../../store/offers/offers.selectors';
import { DEFAULT_SORT, SortMethod } from '../../constants/common';
import { useEffect } from 'react';

export function useCities() {
	const [searchParams] = useSearchParams();
	const cities = Array.from(CITIES);
	const {setCity, setSort} = useActionCreators(offersActions);
	const currentCity = useAppSelector(getCity);
	const currentSort = useAppSelector(getSort);
	const initialCity = searchParams.get('filter') || cities[0];
	const initialSort = searchParams.get('sort') || SortMethod[DEFAULT_SORT];

	useEffect(() => {
		if (initialCity !== currentCity) {
			setCity(initialCity);
		}
		if (initialSort !== currentSort) {
			setSort(initialSort);
		}
	}, [initialCity, initialSort, currentCity, currentSort, setCity, setSort]);

	return {cities, currentCity, currentSort};
}
