import { useEffect } from 'react';
import { useActionCreators, useAppDispatch } from '..';
import { fetchNeighborsApiAction, fetchOfferApiAction, fetchReviewsApiAction } from '../../store/api-actions';
import { offerActions } from '../../store/offer/offer.slice';

export function useFetchOfferData(offerId: string | undefined) {
	const dispatch = useAppDispatch();
	const {dropOffer} = useActionCreators(offerActions);

	useEffect(() => {
		if (offerId) {
			dispatch(fetchOfferApiAction({offerId}));
			dispatch(fetchNeighborsApiAction({offerId}));
			dispatch(fetchReviewsApiAction({offerId}));
		}

		return () => {
			dropOffer();
		};
	}, [offerId, dispatch, dropOffer]);
}
