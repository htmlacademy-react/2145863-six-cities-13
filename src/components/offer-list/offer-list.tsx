import Card from '../card/card';
import { ServerOffer } from '../../types/offer';

type OfferListProps = {
	offers: ServerOffer[];
	setActiveCard: (offerId: string | null) => void;
}

function OfferList({offers, setActiveCard}: OfferListProps): React.JSX.Element {

	return (
		<div className="cities__places-list places__list tabs__content">
			{offers.map((offer) =>
				(
					<Card
						key={offer.id}
						offer={offer}
						setActiveCard={setActiveCard}
					/>
				)
			)}
		</div>
	);
}

export default OfferList;
