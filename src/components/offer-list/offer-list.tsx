import Card from '../card/card';
import { ServerOffer } from '../../types/offer';
import { useState } from 'react';

type OfferListProps = {
	offers: ServerOffer[];
}

function OfferList({offers}: OfferListProps): React.JSX.Element {
	const [activeCard, setActiveCard] = useState<null|string>(null);

	function onActiveCardPointerEnter(offerId: string): void {
		setActiveCard(offerId);
		console.log(offerId, 'set');
	}

	function onActiveCardPointerLeave(): void {
		setActiveCard(null);
		console.log(activeCard, 'unset');
	}

	return (
		<div className="cities__places-list places__list tabs__content">
			{offers.map((offer) =>
				<Card
					key={offer.id}
					offer={offer}
					onActiveCardPointerEnter={onActiveCardPointerEnter}
					onActiveCardPointerLeave={onActiveCardPointerLeave}
				/>)
			}
		</div>
	);
}

export default OfferList;
