import Card from '../card/card';
import { ServerOffer } from '../../types/offer';

type OfferListProps = {
	offers: ServerOffer[];
	activeCard: string;
}

function OfferList({offers, activeCard }: OfferListProps): React.JSX.Element {
	return (
		<div className="cities__places-list places__list tabs__content">
			{offers.map((offer) =>
				<Card offer={offer} key={offer.id}/>)
			}
		</div>
	);
}

export default OfferList;
