import { useState } from 'react';
import { NameSpace, SortMethod } from '../../constants';
import { useDispatch } from 'react-redux';
import { offersActions } from '../../store/offers/offers.slice';
import { useAppSelector } from '../../hooks';
import { SortMap } from '../../utils/convert';
import clsx from 'clsx';

function Sort() {
	const [isOpen, setIsOpen] = useState(false);
	const iconStyle = {
		transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : ''}`,
	};
	const listClass = clsx(
		'places__options places__options--custom',
		isOpen && 'places__options--opened'
	);
	const dispatch = useDispatch();

	function handleKeydown(evt: React.KeyboardEvent<HTMLFormElement>) {
		if (evt.key === 'Escape' && isOpen) {
			evt.preventDefault();
			setIsOpen(false);
		}
	}

	type SortMethodType = typeof SortMethod[keyof typeof SortMethod];

	function handleSortingItemClick(type: SortMethodType) {
		dispatch(offersActions.setSort(type));
		setIsOpen(false);
	}

	const activeSort = useAppSelector((state) => state[NameSpace.Offers].sort);

	return (
		<form className="places__sorting" action="#" method="get" onKeyDown={handleKeydown}>
			<span className="places__sorting-caption">Sort by </span>
			<span className="places__sorting-type" tabIndex={0} onClick={()=>setIsOpen((prevIsOpened) => !prevIsOpened)}>
				{SortMap[activeSort].title}
				<svg style={iconStyle} className="places__sorting-arrow" width="7" height="4">
					<use xlinkHref="#icon-arrow-select"></use>
				</svg>
			</span>
			<ul
				className={listClass}
			>
				{
					(Object.entries(SortMap) as [SortMethodType, (typeof SortMap)[SortMethodType]][])
						.map(([type, value]) => (
							<li key={crypto.randomUUID()}
								className={`places__option ${activeSort === type ? 'places__option--active' : ''}`}
								tabIndex={0}
								onClick={() => handleSortingItemClick(type)}
							>
								{value.title}
							</li>
						)
						)
				}
			</ul>
		</form>
	);
}

export default Sort;
