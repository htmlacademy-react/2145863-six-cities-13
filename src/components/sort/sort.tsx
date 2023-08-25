import { useState } from 'react';
import { SortMethod } from '../../constants';
import { useAppSelector } from '../../hooks';
import { SortMap } from '../../utils/convert';
import clsx from 'clsx';
import { getSort } from '../../store/offers/offers.selectors';
import { useSearchParams } from 'react-router-dom';

type SortMethodType = keyof typeof SortMethod;

function Sort() {
	const [isOpen, setIsOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const iconStyle = {
		transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : ''}`,
	};
	const listClass = clsx(
		'places__options places__options--custom',
		isOpen && 'places__options--opened'
	);

	function handleKeydown(evt: React.KeyboardEvent<HTMLFormElement>) {
		if (evt.key === 'Escape' && isOpen) {
			evt.preventDefault();
			setIsOpen(false);
		}
	}

	function handleSortingItemClick(type: SortMethodType) {
		const onlyParams = Object.fromEntries(searchParams);
		setSearchParams({...onlyParams, sort: type});
		setIsOpen(false);
	}

	const activeSort = useAppSelector(getSort);

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
					(Object.entries(SortMap))
						.map(([type, value]) => (
							<li key={crypto.randomUUID()}
								className={`places__option ${activeSort === type ? 'places__option--active' : ''}`}
								tabIndex={0}
								onClick={() => handleSortingItemClick(type as SortMethodType)}
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
