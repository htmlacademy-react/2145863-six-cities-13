import Card from '../card/card';
import { useAppSelector } from '../../hooks';

function OfferList(): React.JSX.Element {
	const offers = useAppSelector((state) => state.offerList);

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
