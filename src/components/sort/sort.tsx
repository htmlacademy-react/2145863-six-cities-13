import { useState } from 'react';
import type {PointerEvent} from 'react';
import { SortMethod } from '../../constants';
import { useDispatch } from 'react-redux';
import { setSort } from '../../store/action';
import { useAppSelector } from '../../hooks';
import { SortMap } from '../../utils/convert';
import clsx from 'clsx';

function Sort() {
	const [isOpen, setIsOpen] = useState(false);
	const listClass = clsx('places__options places__options--custom', {'places__options--opened': isOpen});
	console.log('isOpen: ', isOpen);
	const dispatch = useDispatch();

	function handleSortItemClick(evt: PointerEvent<HTMLUListElement>) {
		const targetElement = evt.target as HTMLUListElement;
		evt.preventDefault();
		setIsOpen(false);
		targetElement.dataset.sortType
			&& dispatch(setSort(targetElement.dataset.sortType));
	}
	const activeSort = useAppSelector((state) => state.sort);

	console.log(activeSort, SortMethod.PriceToHight, activeSort===SortMethod.PriceToHight);

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
				>Popular</li>
				<li
					data-sort-type={SortMethod.PriceToHight}
					className={`places__option ${activeSort === SortMethod.PriceToHight ? 'places__option--active' : ''}`}
					tabIndex={0}>Price: low to high</li>
				<li
					data-sort-type={SortMethod.PriceToLow}
					className={`places__option ${activeSort === SortMethod.PriceToLow ? 'places__option--active' : ''}`}
					tabIndex={0}
				>Price: high to low</li>
				<li
					data-sort-type={SortMethod.TopRatedFirst}
					className={`places__option ${activeSort === SortMethod.TopRatedFirst ? 'places__option--active' : ''}`}
					tabIndex={0}
				>Top rated first</li>
			</ul>
		</form>
	);
}

export default Sort;
