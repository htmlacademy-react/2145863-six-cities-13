import Card from '../card/card';
// import { useAppSelector } from '../../hooks';
// import { getAllOffers, getCity, getOfferList, getSort } from '../../store/offers/offers.selectors';
// import { SortMap } from '../../utils/convert';
import { ServerOffer } from '../../types/offer';

type OfferListProps = {
	offers: ServerOffer[];
}

function OfferList({offers}: OfferListProps): React.JSX.Element {

	// const rawOffers = useAppSelector(getAllOffers).slice();
	// const city = useAppSelector(getCity);
	// const sort = useAppSelector(getSort);
	// const offers = rawOffers
	// 	.filter((offer) => offer.city.name === city)
	// 	.sort(SortMap[sort].sortFunc);

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
