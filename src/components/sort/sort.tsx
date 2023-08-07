import { useState } from 'react';
import type {PointerEvent} from 'react';
import { NameSpace, SortMethod } from '../../constants';
import { useDispatch } from 'react-redux';
// import { setSort } from '../../store/____action';
import { offersActions } from '../../store/offers/offers.slice';

import { useAppSelector } from '../../hooks';
import { SortMap } from '../../utils/convert';
import clsx from 'clsx';

function Sort() {
	const [isOpen, setIsOpen] = useState(false);
	const listClass = clsx(
		'places__options places__options--custom',
		isOpen && 'places__options--opened'
	);
	const dispatch = useDispatch();

	function handleSortItemClick(evt: PointerEvent<HTMLUListElement>) {
		const targetElement = evt.target as HTMLUListElement;
		evt.preventDefault();
		setIsOpen(false);
		if (targetElement.dataset.sortType) {
			dispatch(offersActions.setSort(targetElement.dataset.sortType));
		}
	}
	const activeSort = useAppSelector((state) => state[NameSpace.Offers].sort);

	return (
		<form className="places__sorting" action="#" method="get">
			<span className="places__sorting-caption">Sort by </span>
			<span className="places__sorting-type" tabIndex={0} onClick={()=>setIsOpen((prevIsOpened) => !prevIsOpened)}>
				{SortMap[activeSort].title}
				<svg className="places__sorting-arrow" width="7" height="4">
					<use xlinkHref="#icon-arrow-select"></use>
				</svg>
			</span>
			<ul
				className={listClass}
				onClick={handleSortItemClick}
			>
				<li
					data-sort-type={SortMethod.Popular}
					className={`places__option ${activeSort === SortMethod.Popular ? 'places__option--active' : ''}`}
					tabIndex={0}
				>Popular
				</li>
				<li
					data-sort-type={SortMethod.PriceToHight}
					className={`places__option ${activeSort === SortMethod.PriceToHight ? 'places__option--active' : ''}`}
					tabIndex={0}
				>Price: low to high
				</li>
				<li
					data-sort-type={SortMethod.PriceToLow}
					className={`places__option ${activeSort === SortMethod.PriceToLow ? 'places__option--active' : ''}`}
					tabIndex={0}
				>Price: high to low
				</li>
				<li
					data-sort-type={SortMethod.TopRatedFirst}
					className={`places__option ${activeSort === SortMethod.TopRatedFirst ? 'places__option--active' : ''}`}
					tabIndex={0}
				>Top rated first
				</li>
			</ul>
		</form>
	);
}

export default Sort;
