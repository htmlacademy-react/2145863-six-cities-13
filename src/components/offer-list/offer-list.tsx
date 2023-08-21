import Card from '../card/card';
import { useAppSelector } from '../../hooks';
import { getOfferList } from '../../store/offers/offers.selectors';

function OfferList(): React.JSX.Element {
	const offers = useAppSelector(getOfferList);

	return (
		<div className="cities__places-list places__list tabs__content">
			{offers.map((offer) =>
				(
					<Card
						block='cities'
						key={offer.id}
						offer={offer}
					/>
				)
			)}
		</div>
	);
}

export default OfferList;
