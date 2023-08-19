import Header from '../../components/header/header';
import GalleryImage from '../../components/gallery-image/gallery-image';
import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../hooks';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import Card from '../../components/card/card';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNeighborsApiAction, fetchOfferApiAction, fetchReviewsApiAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import { MAX_NEIGHBOUR, RequestStatus } from '../../constants/common';
import { offerActions } from '../../store/offer/offer.slice';
import { toast } from 'react-toastify';
import { ErrorCause } from '../../constants/errors';
import ErrorElement from '../../components/error-element/error-element';
import Reviews from '../../components/reviews/reviews';
import { getNeighborPlaces, getOffer, getOfferFetchingStatus } from '../../store/offer/offer.selectors';

function OfferPage(): React.JSX.Element {
	const {id: offerId} = useParams();
	const dispatch = useAppDispatch();
	const offer = useAppSelector(getOffer);
	const fetchingStatus = useAppSelector(getOfferFetchingStatus);
	const neighbourPlaces = useAppSelector(getNeighborPlaces).slice(0, MAX_NEIGHBOUR);

	useDocumentTitle(`Place: ${offer?.title || ''}`);

	useEffect(() => {
		if (offerId) {
			dispatch(fetchOfferApiAction({offerId}));
			dispatch(fetchNeighborsApiAction({offerId}));
			dispatch(fetchReviewsApiAction({offerId}));
		}

		return () => {
			dispatch(offerActions.dropOffer());
		};
	}, [offerId, dispatch]);

	const favoriteLabel = `${offer?.isFavorite ? 'In' : 'To'} bookmarks`;
	const bookmarkClass = clsx(
		'offer__bookmark-button',
		offer?.isFavorite && 'offer__bookmark-button--active',
		'button');
	const hostAvatarClass = clsx(
		'offer__avatar-wrapper',
		offer?.host.isPro && 'offer__avatar-wrapper--pro',
		'user__avatar-wrapper');

	if (fetchingStatus === RequestStatus.Error) {
		toast.error(`offer:${offerId ?? ''} error ${ErrorCause.FetchOffer}`);
	}

	return (
		<div className="page">
			<Header />
			{fetchingStatus === RequestStatus.Error && <ErrorElement cause={ErrorCause.FetchOffer} offerId={offerId}/>}
			{fetchingStatus === RequestStatus.Pending && <LoadingScreen />}
			{fetchingStatus === RequestStatus.Success && offer && (
				<main className="page__main page__main--offer">
					<section className="offer">

						<div className="offer__gallery-container container">
							<div className="offer__gallery">
								{offer.images.map((image) =>
									<GalleryImage imageSrc={image} key={image + offer.id} />)}
							</div>
						</div>

						<div className="offer__container container">
							<div className="offer__wrapper">
								{offer.isPremium && <div className="offer__mark"><span>Premium</span></div>}
								<div className="offer__name-wrapper">
									<h1 className="offer__name">
										{offer.title}
									</h1>
									<button className={bookmarkClass} type="button">
										<svg className="offer__bookmark-icon" width={31} height={33}>
											<use xlinkHref="#icon-bookmark" />
										</svg>
										<span className="visually-hidden">{favoriteLabel}</span>
									</button>
								</div>

								<div className="offer__rating rating">
									<div className="offer__stars rating__stars">
										<span style={{ width: `${offer.rating * 20}%` }} />
										<span className="visually-hidden">Rating</span>
									</div>
									<span className="offer__rating-value rating__value">{offer.rating}</span>
								</div>
								<ul className="offer__features">
									<li className="offer__feature offer__feature--entire">{offer.type}</li>
									<li className="offer__feature offer__feature--bedrooms">
										{offer.bedrooms} Bedrooms
									</li>
									<li className="offer__feature offer__feature--adults">
										Max {offer.maxAdults} adults
									</li>
								</ul>
								<div className="offer__price">
									<b className="offer__price-value">€{offer.price}</b>
									<span className="offer__price-text">&nbsp;night</span>
								</div>

								<div className="offer__inside">
									<h2 className="offer__inside-title">What&apos;s inside</h2>
									<ul className="offer__inside-list">
										{offer.goods.map((good, index) =>
											<li className="offer__inside-item" key={index.toString() + crypto.randomUUID()}>{good}</li>
										)}
									</ul>
								</div>

								<div className="offer__host">
									<h2 className="offer__host-title">Meet the host</h2>
									<div className="offer__host-user user">
										<div className={hostAvatarClass}>
											<img
												className="offer__avatar user__avatar"
												src={offer.host.avatarUrl}
												width={74}
												height={74}
												alt="Host avatar"
											/>
										</div>
										<span className="offer__user-name">{offer.host.name}</span>
										{offer.host.isPro && <span className="offer__user-status">Pro</span>}
									</div>
									{/* description */}
									<div className="offer__description">
										<p className="offer__text">{offer.description}</p>
									</div>
								</div>

								{offerId && <Reviews offerId={offerId}/>}

							</div>
						</div>
						<LeafletMap
							block="offer"
							neighborhoodOffers={neighbourPlaces}
						/>
					</section>
					<div className="container">
						{neighbourPlaces &&
							<section className="near-places places">
								<h2 className="near-places__title">
									Other places in the neighbourhood
								</h2>
								<div className="near-places__list places__list">
									{neighbourPlaces.map((place) =>
										<Card block='near-places' offer={place} key={place.id} />
									)}

								</div>
							</section>}
					</div>
				</main>
			)}

		</div>
	);
}

export default OfferPage;
