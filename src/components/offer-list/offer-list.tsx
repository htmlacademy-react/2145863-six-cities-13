import Card from '../card/card';
import { useAppSelector } from '../../hooks';
import { NameSpace } from '../../constants';

function OfferList(): React.JSX.Element {
	const offers = useAppSelector((state) => state[NameSpace.Offers].offerList);

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
