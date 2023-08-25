import { useAppSelector } from "..";
import { getAllOffers } from "../../store/offers/offers.selectors";
import { SortMap } from "../../utils/convert";

export function useOffers(currentCity: string, currentSort: string) {
	const rawOffers = useAppSelector(getAllOffers).slice();
	const offers = rawOffers
		.filter((offer) => offer.city.name === currentCity)
		.sort(SortMap[currentSort].sortFunc);

	const isEmpty = offers.length === 0;

	return {offers, isEmpty};
}
