import Card from '../card/card';
import { ServerOffer } from '../../types/offer';

type OfferListProps = {
	offers: ServerOffer[];
}

function OfferList({offers}: OfferListProps): React.JSX.Element {

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
